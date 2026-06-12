function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.shopName || "LNS HairStyles",
      data.name || "",
      data.phone || "",
      data.service || "",
      data.date || "",
      data.time || "",
      data.message || "",
      data.createdAt || ""
    ]);

    const ownerEmail = "mangalababu77@gmail.com";
    const subject = "New LNS HairStyles Appointment Booking";

    const body =
      "New appointment booking received:\n\n" +
      "Shop: " + (data.shopName || "LNS HairStyles") + "\n" +
      "Name: " + (data.name || "") + "\n" +
      "Phone: " + (data.phone || "") + "\n" +
      "Service: " + (data.service || "") + "\n" +
      "Date: " + (data.date || "") + "\n" +
      "Time: " + (data.time || "") + "\n" +
      "Message: " + (data.message || "") + "\n\n" +
      "Please contact the customer and confirm the appointment.";

    MailApp.sendEmail(ownerEmail, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Booking saved successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}