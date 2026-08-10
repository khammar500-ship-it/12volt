import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bg from "../assets/Media_Block.png";
import big_logo from "../assets/big_logo.png";
import v1 from "../assets/Vectorlogin1.png";
import v2 from "../assets/Vectorlogin2.png";
import v3 from "../assets/Vectorlogin3.png";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch("https://12volt.cemsbankcentral.com/api/dascbord/loginadmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);

                // الانتقال إلى Main.jsx
                navigate("/Home");
            } else {
                console.log("Login failed:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                w-full h-screen
                bg-cover bg-top
                flex justify-center items-center flex-col
                shadow-[inset_0_0_250px_50px_rgba(0,0,0,0.6)]
                drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]
                overflow-hidden
            "
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Logo */}
            <img
                className="
                    login-logo
                    drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]
                    mb-6
                "
                src={big_logo}
                alt="Logo"
            />

            {/* Form */}
            <form
                className="
                    login-form
                    w-100
                    max-[400px]:w-[90%]
                    drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]
                "
                onSubmit={handleSubmit}
            >

                {/* Email */}
                <div className="flex flex-col mb-5">
                    <label className="flex gap-2 mb-3 items-center">
                        <div className="w-7 h-7 flex items-center justify-center">
                            <img src={v2} alt="Email" />
                        </div>

                        <div className="text-xl text-white">
                            Email
                        </div>
                    </label>

                    <input
                        className="
                            login-input
                            h-12
                            bg-[#ffffff52]
                            rounded-2xl
                            pl-4
                            pr-4
                            outline-0
                            border border-transparent
                            text-white
                            placeholder:text-white/60
                            transition-all duration-300
                        "
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col mb-7">
                    <label className="flex gap-2 mb-3 items-center">
                        <div className="w-7 h-7 flex items-center justify-center">
                            <img src={v1} alt="Password" />
                        </div><div className="text-xl text-white">
                            Password
                        </div>
                    </label>

                    <input
                        className="
                            login-input
                            h-12
                            bg-[#ffffff52]
                            rounded-2xl
                            pl-4
                            pr-4
                            outline-0
                            border border-transparent
                            text-white
                            placeholder:text-white/60
                            transition-all duration-300
                        "
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                {/* Login Button */}
                <button
                    className="
                        login-button
                        h-12
                        text-2xl
                        text-black
                        w-3/4
                        mx-auto
                        bg-[#FEEA09]
                        rounded-2xl
                        flex items-center justify-center
                        gap-3
                        cursor-pointer
                        transition-all duration-300
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                    "
                    type="submit"
                    disabled={loading}
                >
                    <span>
                        {loading ? "LOGIN..." : "LOGIN"}
                    </span>

                    <img
                        className="w-6 transition-transform duration-300"
                        src={v3}
                        alt="Login"
                    />
                </button>
            </form>
        </div>
    );
}

export default Login;