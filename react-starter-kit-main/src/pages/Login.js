import React from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import Joi from 'joi'
import {Controller, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import {joiUpdatedMessage} from '../Utils/AppUtill'
import {loginUser} from '../action/auth.action'

const Login = () => {
    const dispatch = useDispatch()

    const {handleSubmit, formState: { errors }, control} = useForm({
        resolver: joiResolver(
          Joi.object({
            password: Joi.string().min(8).max(20).required().messages(joiUpdatedMessage),
            email: Joi.string()
              .email({tlds: {allow: false}})
              .required()
              .messages(joiUpdatedMessage),
          })
        ),
    }) 

    const onClickToSubmit = data => {        
        dispatch(loginUser(data))
    }

    return (
      <div className="wrapper">
        <div className="form_parent">
      <div className="container form-main">
        <h1>Welcome User</h1>
        
        
        <Form className="row border_form" noValidate onSubmit={handleSubmit(onClickToSubmit)}>
          <Col md={12}>
            <Form.Group>
              <Controller
                name="email"
                control={control}
                render={({ field: {value, onChange}}) => (
                  <>
                    <input
                      type="email"
                      className="form-control"
                      style={{width : '40%'}}
                      placeholder="Enter email"
                      value={value}
                      onChange={e => {
                        onChange(e)
                      }}
                    />
                    {errors.email && errors.email.message && <div>{errors.email.message}</div>}
                  </>
                )}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Controller
                name="password"
                control={control}
                render={({ field: {value, onChange}}) => (
                  <>
                    <input
                      type="password"
                      className="form-control"
                      style={{width : '40%'}}
                      placeholder="Enter password"
                      value={value}
                      onChange={e => {
                        onChange(e)
                      }}
                    />
                    {errors.password && errors.password.message && <div>{errors.password.message}</div>}
                  </>
                )}
              />
            </Form.Group>
          </Col>
          <Col md={12} className="text-center mb-3">
            <Button variant="pink" type="submit" className="py-2 px-3 btn-sm" >
              Sign in
            </Button>
          </Col>
        </Form>

        
      </div>
      </div>
      
      <ul className="bg-bubbles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
    );
}

export default Login;
