import TestAppointment from "../models/testAppointment.model.js"

export const bookNewTestAppointment_DAO = async (patientID, tests, testDate, testStatus, paymentID, billID) => {
    try {
        // Validation
        if (!patientID) {
            throw new Error("Patient ID is required")
        }
        if (!tests || !Array.isArray(tests) || tests.length === 0) {
            throw new Error("At least one test must be selected")
        }
        if (!testDate) {
            throw new Error("Test Date is required")
        }

        // Create new appointment
        const newTestAppointment = new TestAppointment({
            patientID,      // ✅ Lowercase 'p' to match model
            tests,          // ✅ Array of test names
            testDate,
            testStatus,
            paymentID,
            billID
        });

        return await newTestAppointment.save();
    } catch (error) {
        throw new Error(`DAO LAYER ERROR | bookNewTestAppointment_DAO | ${error.message}`)
    }
}