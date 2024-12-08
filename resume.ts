// ! toggle skills section

function toggleSkills() {
    const skillsSection = document.getElementById("skills-section");
    const toggleButton = document.getElementById("toggle-skills-btn");
  
    //! conditions to toggle skills section
  
    if (skillsSection && toggleButton) {
      if (
        skillsSection.style.display === "none" ||
        skillsSection.style.display === ""
      ) {
        skillsSection.style.display = "block"; //! Show section
        toggleButton.textContent = "Hide Skills"; //! Change button text
      } else {
        skillsSection.style.display = "none"; //! Hide section
        toggleButton.textContent = "Show Skills"; //! Change button text
      }
    }
  }
  
  //! event listener for form submission
  
  document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
      event.preventDefault(); //! Prevent the form from submitting and refreshing the page
  
      //! Event listener for the "Generate Resume" button
  
      document.getElementById("generateBtn")?.addEventListener("click", () => {
        const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
        const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
        const contactNumber = (document.getElementById("contactNumber") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
        const languageProficiencies = (document.getElementById("languageProficiencies") as HTMLTextAreaElement).value;
       
  
        //! Handle the Profile Photo file input
  
        const profilePhoto = (document.getElementById("profilePhoto") as HTMLInputElement).files?.[0];
  
        //! generated resume will be displayed here
  
        const resumeOutput = document.getElementById("resumeOutput");
        const saveBtn = document.getElementById("saveBtn");
  
        if (resumeOutput) {
          if (profilePhoto) {
            const reader = new FileReader();
            reader.onload = function (e) {
  
              //! Check if the resume output section exists and display the resume details
  
              resumeOutput.innerHTML = `
           <h1 contenteditable="true">${firstName} ${lastName}</h1>
            <img src="${e.target?.result}" alt="Profile Photo" style="width: 150px; height: 150px; border-radius: 50%;">
        <p><strong>Contact Number:</strong> <span contenteditable="true">${contactNumber}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <h2>Education</h2>
        <p contenteditable="true">${education}</p>
        <h2>Skills</h2>
        <p contenteditable="true">${skills}</p>
        <h2>Work Experience</h2>
        <p contenteditable="true">${workExperience}</p>
        <h2>Language Proficiencies</h2>
        <p contenteditable="true">${languageProficiencies}</p>`;
            };
  
            //! Read the profile photo file as a Data URL (base64 string)
  
            reader.readAsDataURL(profilePhoto);
          } else {
  
  
            //! If no profile photo, generate the resume without the photo
  
            resumeOutput.innerHTML = `
         <h1 contenteditable="true">${firstName} ${lastName}</h1>
        <p><strong>Contact Number:</strong> <span contenteditable="true">${contactNumber}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <h2>Education</h2>
        <p contenteditable="true">${education}</p>
        <h2>Skills</h2>
        <p contenteditable="true">${skills}</p>
        <h2>Work Experience</h2>
        <p contenteditable="true">${workExperience}</p>
        <h2>Language Proficiencies</h2>
        <p contenteditable="true">${languageProficiencies}</p>`;
            if (saveBtn) {
              saveBtn.style.display = "inline-block";
            }
          }
        }
      });
  
    
      //! Event listener for the "Reset" button
  
      document.getElementById("resetBtn")?.addEventListener("click", () => {
        //! Reset the form fields to their default values
        (document.getElementById("resumeForm") as HTMLFormElement).reset();
        //! Clear the Resume Output div
        const resumeOutput = document.getElementById("resumeOutput");
        if (resumeOutput) {
          resumeOutput.innerHTML = "";
  
        }
      });
    });
  
  
  //!  Function to make HTML element editable
  
  function makeEditable(element: HTMLElement) {
    element.setAttribute("contenteditable", "true"); //! Make the element's content editable
    element.style.border = "1px dashed #ccc"; //! a dashed border to indicate it's editable
  }
  
  //! Function to remove the editable status
  
  function removeEditable(element: HTMLElement) {
    element.removeAttribute("contenteditable"); //! Remove the contenteditable attribute
    element.style.border = "none"; //! Remove the dashed border after saving
  }
  
  //! Event listener for the "Save Changes" button
  
  document.getElementById("saveBtn")?.addEventListener("click", () => {
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
      const editableElements = resumeOutput.querySelectorAll(
        "[contenteditable='true']"
      );
      editableElements.forEach((elem) => removeEditable(elem as HTMLElement));
      alert("Changes have been saved!");
    }
  });
  
  
  //! Function to download the resume as a PDF
  
  
  function downloadHTMLpdf() {
    const resumeElement = document.getElementById("resumeOutput");
  
    if (resumeElement) {
      const resumeContent = resumeElement.outerHTML;
      const data =
        "data:text/html;charset=utf-8," + encodeURIComponent(resumeContent);
  
      const downloadLink = document.createElement("a");
      downloadLink.href = data;
      downloadLink.download = "resume.pdf"; // Save as HTML file
  
      document.body.appendChild(downloadLink);
  
      downloadLink.click();
  
      document.body.removeChild(downloadLink);
    } else {
      console.error("Element with ID 'resumeOutput' not found.");
    }
  }
  
  
  //! Function to generate a unique URL on the user's input
  
  function generateUniqueURL() {
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const urlOutput = document.getElementById("urlOutput")!; 
  
    const username = usernameInput?.value.trim();
  
    if (username) {
      const uniqueURL = `https://${username}.resume_builder/resume`; //! Hypothetical domain
  
      urlOutput.textContent = `Your unique resume URL is: ${uniqueURL}`;
  
      urlOutput.setAttribute("data-url", uniqueURL); //! Store the URL 
  
    } else {
      urlOutput.textContent = "Please enter your user name to generate a URL.";
    }
  }
  
  //!  Function to copy URL to clipboard
  
  function copyToClipboard() {
    const urlOutput = document.getElementById("urlOutput")!;
    const url = urlOutput.getAttribute("data-url");
  
    if (url) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        alert("URL copied to clipboard!");
        document.body.removeChild(textarea);
      } catch (err) {
        console.error("Error copying to clipboard: ", err);
        alert("Could not copy the URL. Please copy it manually.");
      }
    } else {
      alert("No URL to copy. Please generate one first.");
    }
  }
  
  //! Event listener for the "Share Resume" button
  
  document.getElementById("shareBtn")?.addEventListener("click", () => {
    generateUniqueURL();  //! Generate the URL
    copyToClipboard();    //! Copy it to clipboard
  });
  
  
  
  //*************************************THE END******************************************/
  
  
  