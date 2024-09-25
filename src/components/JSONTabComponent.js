export default function JSONTab(){
    return(
        <div className="mt-5 d-none" data-response-section>
        <h3>Response</h3>
        <div className="d-flex my-2">
          <div className="me-3">
            Status: <span data-status></span>
          </div>
          <div className="me-3">
            Time: <span data-time></span>ms
          </div>
          <div className="me-3">
            Size: <span data-size></span>
          </div>
        </div>


      </div>
    );
}