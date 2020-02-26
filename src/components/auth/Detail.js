import React from 'react';

const Detail = (props) => {
    let acept = props.location.state;
  //  console.log(acept);
    return (
        props.auth.isAuth && <section className="section auth">
            <div className="container">
                <h1 className="text-center">{acept.blog.title}</h1>
                <hr/>
                <h2>-- {acept.blog.subtitle}</h2>
                <h4>Author : {acept.blog.author}</h4>
                <img src={acept.blog.picture} alt=""></img>
                <p>{acept.blog.context}</p>
            </div>
        </section>
    )
}
export default Detail;