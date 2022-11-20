import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react'
import './index.css'

function ErrorDisplay({errors, id}) {
  const dispatch = useDispatch()
  const noErrorBorder = '1px solid rgba(107, 106, 106, 0.5)'
  const nodes = document.getElementsByTagName('form');
  const splashInputs = document.getElementsByClassName('login-input')
  useEffect(() => {

  },[errors])
console.log(errors)

  for(let field of splashInputs){
    console.log(field.id)
    if(field.id === 'sign-up-email'){
      (errors.includes('email : Please enter an email')||errors.includes('email : Please enter a valid e-mail address.'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }

    if(field.id === 'sign-up-username'){
      (errors.includes('username : Please enter a username'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }

    if(field.id === 'sign-up-profile-pic'){
      (errors.includes('profile_pic : Please use a valid image URL (https://ex.jpg/jpeg/png)'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }

    if(field.id === 'sign-up-password'){
      (errors.includes('password : This field is required.'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }

    if(field.id === 'sign-up-confirm-password'){
      (errors.includes('Passwords do not match'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }
    if(field.id === 'login-password'){
      (errors.includes('password : This field is required.')
      |errors.includes('password : No such user exists.')
      |errors.includes('password : Password was incorrect.'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }
    if(field.id === 'login-email'){
      (errors.includes('email : This field is required.')
      |errors.includes('email : Please enter a valid e-mail address.')
      |errors.includes('email : Email provided not found.'))?
      field.classList.add('error-border'):field.classList.remove('error-border')
    }
  }

  for(let node of nodes){
    if(node?.hasChildNodes()){
      for( let form of node.childNodes.values()){
       if(form.nodeName === 'INPUT') {
        let formPH = form.placeholder
            // form.style.border = noErrorBorder

            if(formPH === 'Server Name'){
              (errors.includes('name : Please enter a server name')
              |errors.includes('name : Server name is already in use.'))?
              form.classList.add('error-border'):form.classList.remove('error-border')
            }

            if(formPH === 'Server Image'){
              (errors.includes('preview_img : Please use a valid image URL (https://ex.jpg/jpeg/png)'))?
              form.classList.add('error-border'):form.classList.remove('error-border')
            }

            if(formPH === 'Channel Name'){
              (errors.includes('name : Please enter a channel name'))?
              form.classList.add('error-border'):form.classList.remove('error-border')
            }
       }
      }
    }
  }


  return (

            <ul className='error-list' id={id}>
                {errors.map((error) => (
                            <li key={error}><i className='fa fa-exclamation-circle' /> {error} </li>
                        ))}
            </ul>
  )
}

export default ErrorDisplay;
