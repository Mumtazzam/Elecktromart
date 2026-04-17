// Google Apps Script untuk ElektroMart
// Deploy: Extensions > Apps Script > Deploy > New Deployment > Web App
// Execute as: Me | Who has access: Anyone

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Buat header jika sheet kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Nama Pelanggan', 'No. Telepon', 'Alamat', 'Item Pesanan', 'Total (Rp)', 'Detail Pesanan']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0EA5E9').setFontColor('#FFFFFF');
    }

    const detailText = data.details.map(item =>
      `${item.name}: ${item.quantity} ${item.unit} @ Rp ${item.price.toLocaleString('id-ID')} = Rp ${item.subtotal.toLocaleString('id-ID')}`
    ).join(' | ');

    sheet.appendRow([
      data.timestamp,
      data.customerName,
      data.customerPhone,
      data.customerAddress,
      data.items,
      data.total,
      detailText
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('ElektroMart Web App aktif!');
}
