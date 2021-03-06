const PDFKit = require('pdfkit')
const fs = require('fs');
const path = require('path')
const dateFormatter = require('./date-formatter')


exports.createInvoice = async (survey, res) => {

    try {
        const pdf = new PDFKit({ margin: 50 })
        const invoicePath = path.join('data', 'invoices', survey.invoice)
        const fontPath = path.join('public', 'fonts', 'SolaimanLipi.ttf')

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="' + survey.invoice + '"', 'utf-8')
        pdf.registerFont('SolaimanLipi', fontPath);

        pdf.pipe(fs.createWriteStream(invoicePath));
        await pdf.pipe(res);

        const dt = new Date()
        const date = dateFormatter.dateFormatter(dt)

        pdf
            .image('public\\images\\logo.png', 145, 42, { width: 50, align: 'center' })
            .fillColor('#444444')
            .font('SolaimanLipi')
            .fontSize(25)
            .text('ময়মনসিংহ সিটি কর্পোরেশন', { align: 'center' })
            .fontSize(18)
            .text('নগর ভবন, ময়মনসিংহ', { align: 'center' })

        pdf
            .fontSize(15)
            .font('SolaimanLipi')
            .text('বিল নং -', 50, 150, { align: 'left' })
            .font('Helvetica')
            .text(survey.orderBill, 100, 150);

        pdf
            .font('SolaimanLipi')
            .text('তারিখ - ', 400, 150)
            .font('Helvetica')
            .text(date, 450, 150);

        pdf
            .text('---------------------------------------------------------------------------------------------', 50, 170);

        pdf
            .font('SolaimanLipi')
            .fontSize(18)
            .text('এসেসমেন্ট আইডি -     ', 50, 220)
            .font('Helvetica')
            .text(survey.assessment_id, 180, 220)


        pdf
            .font('SolaimanLipi')
            .text(`বাড়ির নাম -     ${survey.holdingName}`, 50, 240)
            .text(`মালিকের নাম -     ${survey.ownerName}`)
            .text(`রাস্তা/মহল্লার নাম -     ${survey.road}`)
            .text(`মোবাইল নং -     ${survey.mobile}`)
            .text(`প্লেট সাইজ -     ${survey.plateSize}`)

        pdf
            .font('SolaimanLipi')
            .fontSize(18)
            .text('হোল্ডিং নং -     ', 50, 350)
            .font('Helvetica')
            .fontSize(15)
            .text(survey.holding, 120, 355)

        await pdf
            .font('SolaimanLipi', 18)
            .text('ওয়ার্ড নং -     ', 50, 375)
            .font('Helvetica', 15)
            .text(survey.ward, 120, 380);


        pdf
            .text('---------------------------------------------------------------------------------------------', 50, 400);

        let plateCost
        let costInWord
        if (survey.plateSize == '৬ * ৯ ইঞ্চি') {
            plateCost = '৪০০'
            costInWord = 'চারশত'
        } else if (survey.plateSize == '৮ * ১২ ইঞ্চি') {
            plateCost = '৬০০'
            costInWord = 'ছয়শত'
        }
        await pdf
            .font('SolaimanLipi', 22)
            .moveDown()
            .text(`হোল্ডিং গণনা এবং হোল্ডিং নাম্বার প্লেট স্থাপন প্রকল্প বাস্তবায়নে ময়মনসিংহ সিটি কর্পোরেশন কর্তৃক ধার্যকৃত ${plateCost}  (${costInWord}) টাকা গ্রহন করা হল`)
            .moveDown(5)
            .fontSize(10)
            .text('**এই স্লিপটি সংরক্ষণ করুন, যোগাযোগ - ০১৭১৫৭৫৮৯৩৩, ০১৬২৩৯৯৫১৪৫, ০১৮১৮৭৫৫৪০০**', { align: 'center' })

        pdf.end()
    } catch (err) {
        console.log(err);
    }

}
