import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { billToPdf_service } from "../services/pdfkit.billToPdf.service.js";

import {
    getAllBillsByClientId_Service,
    getPaymentSummary_Service,
    getBillByPaymentStatus_Service,
    generateAndSaveBill_service
} from "../services/bill.service.js";
import { bookNewTestAppointment_Service } from "../services/client.service.js"

// See payment status - Get all bills for the logged-in client
export const seePaymentStatus_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id;  // From JWT token
        const { status } = req.query;  // Optional filter: ?status=pending
        console.log("payment Status in controller: ", status);
        // Get bills by the payemnt status
        const billsByStatus = await getBillByPaymentStatus_Service(clientId, status);
        const allBillsForClient = await getAllBillsByClientId_Service(clientId)
        // Get summary
        const summary = await getPaymentSummary_Service(clientId);

        return res.status(200).json({
            message: "Payment status retrieved successfully ✌️",
            summary,
            allBillsForClient,
            billsByStatus,
            totalBillsByStatus: billsByStatus.length,
            totalBills: allBillsForClient.length
        });
    }
    catch (error) {
        console.error(`CONTROLLER ERROR | seePaymentStatus_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "seePaymentStatus_controller",
            error: error.toString()
        });
    };
}



// Other controller functions...
export const bookAppointment_controller = async (req, res) => {
    try {
        const { patientID, tests, testDate, testStatus, paymentID, billID } = req.body;   // next change --> rather than destructuring the total object just pass it as a veriable 

        const newAppointmentBooking = await bookNewTestAppointment_Service(
            patientID,
            tests,
            testDate,
            testStatus,
            paymentID,
            billID
        );

        return res.status(200).json({
            message: "New Appointment is booked successfully ✌️",
            appointmentDetails: newAppointmentBooking
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | bookAppointment_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "bookAppointment_controller",
            error: error.toString()
        });
    }
};




export const generateAndSaveBill_controller = async (req, res) => {
    try {
        const clientId = req.user.user_id; // extracting clinetId from JWT  
        const billData = req.body; // bill data to be saved
        billData.clientId = clientId; //  Inject clientId into billData
        const generatedBill = await generateAndSaveBill_service(billData);

        return res.status(201).json({
            message: "Bill generated and saved successfully ✌️",
            bill: generatedBill
        });
    } catch (error) {
        console.error(`CONTROLLER ERROR | generateAndSaveBill_controller: ${error}`)
        return res.status(500).json({
            message: error.message,
            controller: "generateAndSaveBill_controller",
            error: error.toString()
        });
    }
};


export const generatePdfOfBill_controller = async (req, res) => {
    try {

        const billData = req.body; // total bill object from the database 

        const pdfBuffer = await billToPdf_service(billData);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=bill-${billData.billNumber}.pdf`);

        res.send(pdfBuffer);

    } catch (error) {
        console.error(`CONTROLLER ERROR | generatePdfOfBill_controller: ${error}`);
        return res.status(500).json({
            message: error.message,
            controller: "generatePdfOfBill_controller",
            error: error.toString()
        });
    }
};

export const updateReportValues_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});

export const generateReports_controller = tryCatchWrapper(async (req, res) => {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented yet" });
});