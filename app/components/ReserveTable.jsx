export default function ReserveTable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg text-white px-6 py-12">
      <div className="max-w-3xl w-full p-8 bg-darkbg rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-rose-500 mb-6">
          Reserve Your Table
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Book a table in advance to ensure a wonderful dining experience.
        </p>
        <form action="/api/reserve" method="POST" className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              name="datetime"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Number of Guests</label>
            <input
              type="number"
              name="guests"
              required
              min="1"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter number of guests"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-rose-500 text-white font-semibold text-lg hover:bg-rose-600 transition"
          >
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  );
}
