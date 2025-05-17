const Button=({style,onClick,children,disabled,type}) =>{
    return ( 
        <button
        className={style}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
     );
}

export default Button;