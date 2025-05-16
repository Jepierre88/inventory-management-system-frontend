import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<any>) {

  return (
    <button {...props} className={`bg-primary text-white rounded-2xl px-3 py-2 cursor-pointer hover:bg-primary/100 active:scale-90 transition-all duration-300 shadow-md hover:shadow-lg ${props.className}`}>
      {props.children}
    </button>
  )
}