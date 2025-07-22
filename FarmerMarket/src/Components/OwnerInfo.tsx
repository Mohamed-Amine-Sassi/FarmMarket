interface ownerProp {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
}

export default function OwnerInfo({
  firstName,
  lastName,
  phoneNumber,
  email,
}: ownerProp) {
  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm shadow-lg z-50 bg-white rounded-lg border border-gray-200">
      <div className="p-4 pb-2">
        <h2 className="text-xl font-bold text-gray-900">Owner Information</h2>
      </div>
      <div className="p-4 pt-0 space-y-2">
        <div className="text-sm text-gray-700">
          <p>
            <span className="font-semibold">First Name:</span> {firstName}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {lastName}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>
      </div>
    </div>
  );
}
