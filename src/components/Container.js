import React from 'react'

const Container = (props) => {
    return (
        <section>
            <div className={props.class1}>
                <div className='container-xxl'>
                    {props.children}
                </div>
            </div>
        </section>
    )

}

export default Container
