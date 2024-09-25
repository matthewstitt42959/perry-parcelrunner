export default function HeaderTab() {
    return (
        <div>
            <h2>Header Tab Content</h2>
            <p> This is the content for Header</p>
            <div className="p-4">
                <form data-form>
                    <div className="input-group mb-4">
                        <div className="tab-pane fade" id="request-headers" role="tabpanel" aria-labelledby="request-headers-tab">
                            <div data-request-headers></div>
                            <button data-add-request-header-btn className="mt-2 btn btn-outline-success" type="button">Add</button>
                        </div>
                        <div className="tab-pane fade" id="json" role="tabpanel" aria-labelledby="json-tab">
                            <div data-json-request-body className="overflow-auto"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>




    );
}

