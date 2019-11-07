import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from 'formik';
import * as Yup from "yup";


function UserForm ({ errors, touched, values, status }) {
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched)
    useEffect(()=> {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return(
        <div className="user-form">
            <h1>Welcome New User</h1>
            {/* <Formik> */}
                <Form className="form-box">
                    <label>Name
                        <Field type="text" name="name" placeholder="Name" />
                    </label>
                    {touched.name && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}

                    <label>
                        Role
                         <Field component="select" name="role" className="select">
                            <option value="frontendEngineer">Frontend Engineer</option>
                            <option value="BackendEngineer">Backend Engineer</option>
                            <option value="fullStackEngineer">Full Stack Engineer</option>
                            <option value="uxDesigner">UX Designer</option>
                            <option value="dataScientist">Data Scientist</option>
                         </Field>
                    </label>

                    <label>Email
                    <Field type="text" name="email" placeholder="abc@email.com" /></label>
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}

                    <label>Password
                    <Field type="password" name="password" placeholder="Password" /></label>
                    {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}

                    <label>
                        Accept Terms of Service
                        <Field type="checkbox" name="tos" checked={values.tos} />
                    </label>
                    {touched.tos && errors.tos && (
                        <p className="error">{errors.tos}</p>
                    )}

                    <button type="submit">Submit</button>
                </Form>
            {/* </Formik> */}
            
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role}</li>
                </ul>
            ))}

        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, role, email, password, tos  }) {
        return {
            name: name || "",
            role: role || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please fill out your name."),
        email: Yup.string().email().required("Please enter your email."),
        password: Yup.string().min(6).required("Please enter at least 6 letters"),
        tos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res)
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }

})(UserForm)

export default FormikUserForm;