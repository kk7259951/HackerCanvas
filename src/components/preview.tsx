import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundlingError: string;
}

const html = `
    <html>
      <head></head>
      <body> 
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"> <h4>Error</h4>' + err + '</div>';
            throw err;
          };

          window.addEventListener('error', (event) => {
            event.preventDefault(); // to prevent console double logging errors
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // with each execution of code via onclick events, we reset iframe contents and then go to execution of code 
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe 
        title="preview" 
        ref={iframe} 
        sandbox="allow-scripts" 
        srcDoc={html} 
      />
      {bundlingError && <div className="preview-error">{bundlingError}</div>}
    </div>
  );
};

export default Preview;