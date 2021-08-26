import React,{ useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { userRegister } from '../../redux/actions/userActions.js';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Register = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirmPassword] = useState("");
    const [avatar,setAvatar] = useState("");

    const [message,setMessage] = useState('');
    const [messageStatus,setMessageStatus] = useState(false);
    const [errorMessages,setErrorMessages] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleAvatarSelection = (e) => {
        e.preventDefault();
        var preview = document.getElementById('preview');
        var form_upload_input = document.getElementById('form-upload-input');
        form_upload_input.click();
        form_upload_input.addEventListener("change",function() {
            const file = this.files[0];
            setAvatar(this.files[0]);
            var reader = new FileReader();
            reader.onload = function(e) {
                var url = e.target.result;
                // preview.style.backgroundImage = `url("${url}")`;
                preview.setAttribute('src',url);
                form_upload_input.setAttribute('value',url);
            }
            reader.readAsDataURL(file);
        })
    }

    const haveSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirm_password',confirm_password);
        formData.append('avatar',avatar);

        dispatch(userRegister(formData)).then(res =>{
            if(res.data.success === true){
                history.push("/home");
            } else if(res.data.success === false) {
                setErrorMessages(res.data.data.errors);
                // console.log(res.data.data.errors.email);
            }
        })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h5 className="heading">create your account</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Because there will be documents that you need to prepare to apply for the loan. lets start off by creating a password so that you can login to your account once you have these document ready.</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div className="form-upload-wrap">
                            {/*
                                <div className="form-upload" id="preview"></div>
                            */}
                            <img className="form-upload" id="preview"/>
                            <div className="form-upload-label" onClick={handleAvatarSelection}>upload</div>
                            <input id="form-upload-input" type="file" />
                                {
                                errorMessages['avatar']
                                    ?
                                        <div className="text-danger">{ errorMessages['avatar'] }</div>
                                    : ''
                                }
                        </div>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col>
                                <div className="form-group mb-3">
                                    <label className="form-label">name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value) } />
                                        {
                                            errorMessages['name']
                                                ?
                                                    <div className="text-danger">{ errorMessages['name'] }</div>
                                                : ''
                                        }
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group mb-3">
                                    <label className="form-label">email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value) } />
                                        {
                                            errorMessages['email']
                                                ?
                                                    <div className="text-danger">{ errorMessages['email'] }</div>
                                                : ''
                                        }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="form-label">password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value) } />
                                        {
                                            errorMessages['password']
                                                ?
                                                    <div className="text-danger">{ errorMessages['password'] }</div>
                                                : ''
                                        }
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label className="form-label">confirm password</label>
                                    <input type="password" className="form-control" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value) } />
                                        {
                                            errorMessages['confirm_password']
                                                ?
                                                    <div className="text-danger">{ errorMessages['confirm_password'] }</div>
                                                : ''
                                        }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="form-button" onClick={haveSubmit}>Save & Next</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;