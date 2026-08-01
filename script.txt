/**
 * BookMyDine QR - Smart Google Apps Script Webhook
 * 
 * FEATURES IMPLEMENTED:
 * 1. Automatic Row Reuse: If old rows are deleted, new entries automatically fill the first empty row!
 * 2. WhatsApp Direct Chat Column: Creates a 1-click "=HYPERLINK()" to open WhatsApp chat directly with the owner!
 * 3. Status Dropdown: Creates an interactive in-cell dropdown (New Lead, Contacted, Preview Sent, Approved, Cancelled).
 * 4. Annual 12-Month Plan & Price Tracking: Records billing cycle, total price, and 2-Month FREE offer details.
 * 5. Google Drive Auto-Uploader: Uploads Logo, Menu PDF, and Dish Photos to Drive and generates clickable links.
 * 
 * INSTRUCTIONS:
 * 1. Copy ALL code below.
 * 2. In Google Sheets, click "Extensions" > "Apps Script".
 * 3. Select all existing code, delete it, and paste this script. Click "Save".
 * 4. At top toolbar dropdown, select "initialSetup" and click "Run".
 * 5. Click "Deploy" > "Manage deployments" > Pencil (Edit) icon > New Version > "Deploy".
 */

var FOLDER_NAME = "BookMyDine_Uploads";

function initialSetup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  setupSheetHeaders(sheet);
  getOrCreateUploadFolder();
  SpreadsheetApp.getUi().alert("✅ Success! Sheet headers, dropdowns, and 'BookMyDine_Uploads' folder prepared!");
}

function setupSheetHeaders(sheet) {
  var headers = [
    "Timestamp",
    "Status",
    "WhatsApp Chat", 
    "Owner Name", 
    "Phone Number", 
    "Email Address", 
    "Restaurant Name", 
    "Restaurant Type", 
    "Physical Address", 
    "Google Maps Link", 
    "Instagram Link", 
    "Chosen Plan", 
    "Billing Cycle",
    "Plan Price & Offer",
    "Menu Theme", 
    "Brand Color", 
    "Logo Link", 
    "Menu PDF Link", 
    "Food Photos Links"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0f623f");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);
  
  for (var i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 160);
  }
}

// Find first available row (reuses deleted row space instead of appending far below!)
function getFirstAvailableRow(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 2;
  
  var values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (!values[i][0] || values[i][0].toString().trim() === "") {
      return i + 2;
    }
  }
  return lastRow + 1;
}

function getOrCreateUploadFolder() {
  var folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(FOLDER_NAME);
  }
}

function saveBase64ToDrive(base64Data, fileName, folder) {
  if (!base64Data || base64Data.length < 50) return null;
  try {
    var parts = base64Data.split(",");
    var contentType = parts[0].split(";")[0].replace("data:", "");
    var decoded = Utilities.base64Decode(parts[1]);
    var blob = Utilities.newBlob(decoded, contentType, fileName);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log("Drive upload error: " + err.toString());
    return null;
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupSheetHeaders(sheet);
    var uploadFolder = getOrCreateUploadFolder();

    var data = JSON.parse(e.postData.contents);
    
    var timestamp = data.createdAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var ownerName = data.ownerName || "";
    var rawPhone = data.phone || "";
    var email = data.email || "";
    var restaurantName = data.restaurantName || "";
    var restaurantType = data.restaurantType || "";
    var address = data.address || "";
    var mapsLink = data.mapsLink || "";
    var instagramLink = data.instagramLink || "";
    var plan = (data.plan || "").toUpperCase();
    var cycle = (data.billingCycle || "monthly").toUpperCase();
    var planPrice = data.planPrice || "";
    var theme = data.theme || "";
    var brandColor = data.brandColor || "";

    // 1. Generate Direct WhatsApp Chat Link
    var cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
    var defaultMsg = encodeURIComponent("Hi " + ownerName + "! Thank you for choosing BookMyDine QR for " + restaurantName + ". We are starting your custom digital menu setup.");
    var waUrl = cleanPhone ? "https://wa.me/" + cleanPhone + "?text=" + defaultMsg : "";
    var waCell = waUrl ? '=HYPERLINK("' + waUrl + '", "💬 Chat on WhatsApp")' : rawPhone;

    // 2. Upload Logo to Google Drive
    var logoName = (restaurantName ? restaurantName.replace(/\s+/g, "_") : "Restaurant") + "_Logo";
    var logoUrl = saveBase64ToDrive(data.logoBase64, logoName, uploadFolder);
    var logoCell = logoUrl 
      ? '=HYPERLINK("' + logoUrl + '", "🖼️ View Logo")' 
      : (data.logoName ? "Uploaded: " + data.logoName : "No Logo");

    // 3. Upload Menu PDF to Google Drive
    var pdfName = (restaurantName ? restaurantName.replace(/\s+/g, "_") : "Restaurant") + "_Menu_PDF";
    var pdfUrl = saveBase64ToDrive(data.pdfBase64, pdfName, uploadFolder);
    var pdfCell = pdfUrl 
      ? '=HYPERLINK("' + pdfUrl + '", "📄 View Menu PDF")' 
      : (data.pdfName ? "Uploaded: " + data.pdfName : "No PDF");

    // 4. Upload Food Photos to Google Drive
    var foodLinks = [];
    if (data.foodImages && Array.isArray(data.foodImages)) {
      for (var i = 0; i < data.foodImages.length; i++) {
        var imgObj = data.foodImages[i];
        var imgName = (restaurantName ? restaurantName.replace(/\s+/g, "_") : "Restaurant") + "_Dish_" + (i + 1);
        var url = saveBase64ToDrive(imgObj.base64, imgName, uploadFolder);
        if (url) {
          foodLinks.push('=HYPERLINK("' + url + '", "📸 Photo ' + (i + 1) + '")');
        }
      }
    }
    var foodPhotosCell = foodLinks.length > 0 ? foodLinks.join(" | ") : "None";

    // Maps & Instagram Hyperlinks
    var mapsCell = mapsLink ? '=HYPERLINK("' + mapsLink + '", "📍 Google Maps")' : "";
    var instaCell = instagramLink ? '=HYPERLINK("' + instagramLink + '", "📸 Instagram")' : "";

    // Find first available row (reuses deleted row space!)
    var targetRow = getFirstAvailableRow(sheet);

    var rowValues = [
      timestamp,
      "New Lead",
      waCell,
      ownerName,
      rawPhone,
      email,
      restaurantName,
      restaurantType,
      address,
      mapsCell,
      instaCell,
      plan,
      cycle,
      planPrice,
      theme,
      brandColor,
      logoCell,
      pdfCell,
      foodPhotosCell
    ];

    sheet.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);

    // Apply Interactive Status Dropdown Validation to column 2
    var statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["New Lead", "Contacted", "Preview Sent", "Approved", "Cancelled"], true)
      .build();
    sheet.getRange(targetRow, 2).setDataValidation(statusRule);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Saved to row " + targetRow }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success", message: "BookMyDine Smart Apps Script is Active!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
