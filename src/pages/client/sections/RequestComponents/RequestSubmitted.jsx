
export function RequestSubmitted({ countdown }) {
 
 return (
 <div className="min-h-[70vh] flex items-center justify-center">

      <div className=" border rounded-2xl p-10 text-center max-w-md w-full space-y-4">
        <div className=" w-16 h-16 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-3xl">
          ✓
        </div>

        <h1 className=" text-3xl font-semibold">
          Request Submitted
        </h1>

        <p className="text-gray-600">
          Staff will review your
          request and send the
          final cost later.

        </p>

        <p className="text-sm text-gray-500">
          Redirecting in
          {" "}
          {countdown}
          ...

        </p>

      </div>

    </div>
  );
}

export  function RequestNoData(){
  return(
      <div className="p-6">
        No checkout data found
      </div>
  );
}