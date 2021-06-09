const Modal=(props)=>{
   const {open,close} = props;
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                    <div className="close_wrapper">
                    <div className="close" onClick={close}> close </div>
                    </div>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}
export default Modal;