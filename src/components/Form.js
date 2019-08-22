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
                    <Field type="text" name="name" placeholder="Name" />
                    {touched.name && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}

                    <Field type="text" name="email" placeholder="abc@email.com" />
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}

                    <Field type="password" name="password" placeholder="Password" />
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
                </ul>
            ))}

        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos  }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please fill out your name."),
        email: Yup.string().email().required("Please enter your email."),
        password: Yup.string().min(6).required("Please enter at least 6 letters"),
        tos: Yup.boolean().required("Required")
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