import { CourseBenefits } from "./_components/course-benefits";
import { CourseImage } from "./_components/course-image";
import { CourseInfo } from "./_components/course-info";
import { CourseNotes } from "./_components/course-notes";
import { PaymentSummary } from "./_components/payment-summary";
import { PromoCode } from "./_components/promo-code";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800">
              Courses
            </a>
            <span className="mx-2">&gt;</span>
            <a href="#" className="hover:text-gray-800 truncate">
              Machine Learning with Python: From Basics to Deployment
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">Payment Details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image and Info */}
            <div className="md:bg-white md:p-6 rounded-lg md:border md:border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseImage />
                <CourseInfo />
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <PromoCode />
            </div>

            <div className="md:hidden"><PaymentSummary /></div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="md:text-lg font-semibold text-gray-800 mb-4">Description</h3>
              <p className="max-md:text-sm text-gray-600">Build automation with Python and APIs in real-world scenarios.</p>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CourseBenefits />
            </div>

            {/* Notes */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CourseNotes />
            </div>
          </div>

          {/* Right Sidebar - Payment Summary */}
          <div className="lg:col-span-1 max-md:hidden">
            <div className="sticky top-6">
              <PaymentSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
