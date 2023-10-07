import Breadcrumb from "../layouts/breadcrumb";

function NotFound() {
    return (
        <>
            <Breadcrumb title="Not Found" />

            <section className="pd-top-120 pd-bottom-120">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="notfound">
                                <img src="./assets/img/404.png" alt="Not Found" width={"30%"} className="d-block mx-auto" />
                                <h1 className="text-center">Page Not Found</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default NotFound;
