
# PDF Viewer

This is a React-based web application for rendering PDF files with the added feature of being able to annotate the documents with rectangles.<br/><br/>
The app utilizes the pdf-js library for displaying the PDFs and allows users to draw rectangles on top of the document to highlight specific sections. Don't let the constraints of a static PDF hold you back - use this app to fully engage with and analyze your documents.


## Screenshots

![App Screenshot](https://imgur.com/f30eMK2.png)
![App Screenshot](https://imgur.com/SMvpEWr.png)
![App Screenshot](https://imgur.com/mKnADnd.png)


## How does it work?

- Fetches the PDF File From the server based on the link clicked in the home page.
- Pdf-js helps in rendering the PDF File into a canvas
- Another canvas layer is created for rendering existing rectangles
- Another canvas layer is utlized to draw new rectangles
- Existing rectangle annotations are persisted into local storage after every change.
