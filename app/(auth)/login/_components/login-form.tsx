"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { login } from "@/actions/auth";
import GoogleSigninButton from "../../_components/google-signin-button";
import Divider from "@/app/(routes)/_components/divider";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Log in to your account
        </h1>
      </div>

      <form className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="abcd@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="sduejdigs52435"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              handleInputChange("rememberMe", checked as boolean)
            }
          />
          <label
            htmlFor="remember"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <Button
          formAction={login}
          type="submit"
          className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 max-md:text-sm"
        >
          Log in
        </Button>

        {/* Divider */}
        <Divider text="atau" />

        {/* Google Sign up */}
        <GoogleSigninButton />
      </form>

      {/* Sign up Link */}
      <div className="text-center max-md:text-sm">
        <span className="text-gray-600">Haven&apos;t an account? </span>
        <Link
          href="/signup"
          className="text-aqua-mist hover:text-aqua-depth font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
