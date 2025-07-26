export function CourseHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-lg text-gray-800">mart</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Courses
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              About Us
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Reviews
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              About Me
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              Log in
            </button>
            <button className="bg-aqua-mist hover:bg-aqua-depth text-white px-4 py-2 rounded-lg">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
