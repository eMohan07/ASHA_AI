import PatientForm from '../../../components/PatientForm'

export const metadata = {
  title: 'Add Patient — ASHA AI',
}

export default function NewPatientPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Add New Patient</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the patient's details. Works offline too — data syncs when connected.
        </p>
      </div>

      {/* Form card */}
      <div className="card p-6 sm:p-8">
        <PatientForm />
      </div>

    </div>
  )
}
