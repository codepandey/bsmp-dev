import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import Error from '../../components/404'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import NewForm from '../../components/NewPage'


const ErrorPage =() => {
    return(
        <Fragment>
            <Navbar hClass={"header-style-2"} />
            {/* <PageTitle pageTitle={'404'} pagesub={'404'}/>  */}
            {/* <Error/> */}
            <NewForm />
            <Footer/>
            {/* <Scrollbar/> */}
        </Fragment>
    )
};
export default ErrorPage;

