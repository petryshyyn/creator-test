import React, {Component} from "react";
import {Link} from "react-router-dom";
import './contactMe.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import vector from "./svg/vector.svg"
import arrow from "./svg/arrow.svg"
import camera from "./svg/camera.svg"
import polygonInstagram from "./png/polygon-instagram.png"

class ContactMe extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProjectDescription = this.onChangeProjectDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.state = {
        name: "",
        email: "",
        projectDescription: "",
        file: null
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#F7F0FF"
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeProjectDescription(e) {
        this.setState({projectDescription: e.target.value});
    }

    onChangeFile(e) {
        this.setState({file: e.target.files[0]});
    }


    async send() {
    const { name, email, projectDescription, file} = this.state;

    const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("projectDescription", projectDescription);
            if (file) {
                formData.append('file', file);
            }

            try {
                const response = await fetch("http://localhost:5000/send-email", {
                    method: "POST",
                    body: formData,
                });

                const message = await response.text();
                alert(message);
                this.setState({name: ""});
                this.setState({email: ""});
                this.setState({projectDescription: ""});
                this.setState({file: null});
            } catch (error) {
                alert("Не вдалося надіслати email.");
            }
    }

    render() {
        const {
            name,
            email,
            projectDescription,
            file,
        } = this.state;
        return (
            <div>
                <div className="main-container">
                    <div className="cursor-pointer">
                        <div className="contact-me-name">
                            Contact Me
                        </div>
                        <div className="hr-style"/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="contact-me-desc">
                            Let me know if you want to talk
                            about a potential collaboration.
                            I'm available for freelance work.
                        </div>
                        <div className="create-profile-desc-email d-inline">
                            <Link to="https://mail.google.com/mail/u/0/#inbox" target="_blank">
                                infoname@mail.com
                            </Link>
                        </div>
                    </div>
                    <div className="form-style">
                        <input
                            class="form-input form-control-lg"
                            type="text"
                            placeholder="What’s your name?"
                            value={name}
                            onChange={this.onChangeName}/>
                        <hr className="hr-form"/>
                        <input
                            class="form-input form-control-lg"
                            type="text"
                            placeholder="Your email"
                            value={email}
                            onChange={this.onChangeEmail}/>
                        <hr className="hr-form"/>
                        <input
                            class="form-input form-control-lg"
                            type="text"
                            placeholder="Tell me about your project"
                            value={projectDescription}
                            onChange={this.onChangeProjectDescription}/>
                        <hr className="hr-form"/>
                    </div>
                    <div className="send-buttons">
                        <div className="get-a-quote-button" onClick={this.send}>
                            Get a quote
                        </div>
                        <div className="double-bottoms">
                            <div className="file-upload-block">
                            <input
                                accept="image/png, image/jpeg, image/jpeg"
                                type="file"
                                id="file"
                                className="file-upload-input"
                                onChange={this.onChangeFile}
                                />
                                <img src={vector} alt="" className="cursor-pointer"/>
                            </div>
                            <div>
                                <img src={arrow} alt="" className="cursor-pointer" onClick={this.send}/>
                            </div>
                        </div>
                    </div>
                    <div className="lets-be-friends-block">
                        <div>
                            Let's be Friends
                        </div>
                    </div>
                    <div className="instagram-block">
                        <Link to="https://www.instagram.com/" target="_blank">
                            <div className="position-relative">
                                <img src={polygonInstagram} alt="" className="cursor-pointer"/>
                                <img src={camera} alt="" className="camera-icon-position"/>
                            </div>
                        </Link>
                        <Link to="https://www.instagram.com/" target="_blank">
                            <div className="position-relative">
                                <img src={polygonInstagram} alt="" className="cursor-pointer"/>
                                <img src={camera} alt="" className="camera-icon-position"/>
                            </div>
                        </Link>
                        <Link to="https://www.instagram.com/" target="_blank">
                            <div className="position-relative">
                                <img src={polygonInstagram} alt="" className="cursor-pointer"/>
                                <img src={camera} alt="" className="camera-icon-position"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactMe;
