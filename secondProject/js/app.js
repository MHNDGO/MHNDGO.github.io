//This ensures that the website loads first before runnning the code
document.addEventListener('DOMContentLoaded', () => {
  //This selects the sections in the website 
  const sections = document.querySelectorAll('section');

  //This selects the Navbar UL item with the navbar__list'
  const navList = document.getElementById('navbar__list');

  //This is the function to create new nav items dynamically every time a new section is added
  function createNavItems() {
    sections.forEach(section => {
      const sectionID = section.getAttribute('id');
      const sectionNav = section.getAttribute('data-nav');
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');

      anchor.classList.add('menu__link');
      anchor.href = `#${sectionID}`;
      anchor.textContent = sectionNav;

      listItem.appendChild(anchor);
      navList.appendChild(listItem);
    });
  }

  //This call the function to create nav items
  createNavItems();
  //This function makes sure the link items scroll to their corresponding section with the smooth scrolling effect
  function addSmoothScrolling() {
    const links = document.querySelectorAll('.menu__link');

    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetID = link.getAttribute('href');
        const targetSection = document.querySelector(targetID);

        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }

  // This calls the function to add smooth scrolling
  addSmoothScrolling();

  // This function makes the section that the user is looking at is given the active class using getBoundingClientRect() method
  document.addEventListener("scroll", function () {
    sections.forEach(section => {
      let sectionRect = section.getBoundingClientRect();
      if (sectionRect.top >= 0 && sectionRect.top < window.innerHeight || sectionRect.bottom > 0 && sectionRect.top <= window.innerHeight) {
        section.classList.add("active")
      } else {
        section.classList.remove("active")
      }
    });
  });
  /*This function gives the chevrons the rotate class when clicked
    and it changes the font awesome chveron up icon because the rotate 
    property also changes the position which we don't want to happen
    and it also makes the text in the section disappear when clicked.
  */
  const chevrons = document.querySelectorAll('.all-chevrons');
  chevrons.forEach(chevron => {
    chevron.addEventListener('click', function() {
      chevron.classList.toggle('rotate');
      const sectionText = chevron.closest('section').querySelector('.section-text');
      sectionText.classList.toggle('hidden');
    });
  });


  // This function saves all the created comments to the localStorage
  function saveCommentsToLocal(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  // This function is used to load comments from localStorage and create comment elements in HTML
  function loadCommentsFromLocal() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Create comment elements for each stored comment
    comments.forEach(comment => {
      let newComment = document.createElement('div');
      newComment.className = 'comment-box';
      newComment.innerHTML = `
        <div class="comment-info">
        <img class="pfp" src="./images/default-avatar-by-ka_han.jpg">
        <div class="text-info">
            <h3 class="name">${comment.name}</h3>
            <p class="email">${comment.email}</p>
          </div>
        </div>
        <div class="comment-content">
          <p>${comment.content}</p>
        </div>
      `;

      // This ensures that the latest comment is on top of the other comments
      let commentSection = document.querySelector("#comment-section .landing__container");
      let commentHeader = commentSection.querySelector('h2');

      // Insert the new comment after the h2 element
      commentHeader.insertAdjacentElement('afterend', newComment);
    });
  }

  loadCommentsFromLocal();
  //This detects when the create comment button is clicked and then begins the procedure
  let createCommentButton = document.querySelector(".create-comment-button");
  createCommentButton.addEventListener("click", function (event) {
    event.preventDefault();

    let commenterNameField = document.querySelector("#name-field");
    let commenterEmailField = document.querySelector("#email-field");
    let commenterContentField = document.querySelector(".create-content-textarea");
    let commenterName = commenterNameField.value;
    let commenterEmail = commenterEmailField.value;
    let commenterContent = commenterContentField.value;

    // This checks if the text in the Email field is a correct Email or not
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    // This checks if the name is longer than 20 words and if it is longer than 20 words it will stop the execution
    if (commenterName.length > 20) {
      alert("Name cannot be longer than 20 letters");
      return; // Stop the execution if name is too long
    }
    // This checks if the Email is longer than 50 words and if it is longer than 50 words it will stop the execution

    if (commenterEmail.length > 50) {
      alert("Email cannot be longer than 50 letters");
      return; // Stop the execution if email is too long
    }
    // This checks if the comment is longer than 500 words and if it is longer than 500 words it will stop the execution

    if (commenterContent.length > 500) {
      alert("Comment cannot be longer than 250 letters");
      return; // Stop the execution if email is too long
    }
    // This checks if the Email the user entered follows the Email pattern or not and if it isn't it will stop the execution 

    if (!emailPattern.test(commenterEmail)) {
      alert("Please enter a valid email address.");
      return; // Stop the execution if email is invalid
    }
    //This Checks if the fields aren't empty and if they are it will stop the execution
    if (commenterName !== "" && commenterEmail !== "" && commenterContent !== "") {
      //This is used to save comment to localStorage
      saveCommentsToLocal({
        name: commenterName,
        email: commenterEmail,
        content: commenterContent
      });

      // Create a new comment element from from the data the user created
      let newComment = document.createElement('div');
      newComment.className = 'comment-box';
      newComment.innerHTML = `
        <div class="comment-info">
        <img class="pfp" src="./images/default-avatar-by-ka_han.jpg">

          <div class="text-info">
            <h3 class="name">${commenterName}</h3>
            <p class="email">${commenterEmail}</p>
          </div>
        </div>
        <div class="comment-content">
          <p>${commenterContent}</p>
        </div>
      `;

      let commentSent = document.querySelector(".comment-sent")
      // Find the h2 element in the comment section
      let commentSection = document.querySelector("#comment-section .landing__container");
      let commentHeader = commentSection.querySelector('h2');
      
      // Insert the new comment after the h2 element
      commentHeader.insertAdjacentElement('afterend', newComment);
      // This makes the commentSent div appear after creating the comment
      commentSent.classList.add("shown")
      // This makes it disappear after 3 seconds
      setTimeout(function(){
        commentSent.classList.remove("shown")
      },3000)
      //This clears the form fields after creation
      commenterNameField.value = '';
      commenterEmailField.value = '';
      commenterContentField.value = '';
    } else {
      alert("Please ensure all fields are filled out.");
    }
  });
  /*
    This function is the most important function in the webstite as it's used to make the
    header disappear when scrolling down and appear when scrolling up by detecting which direction 
    the user is scrolling and if the user is not scrolling for 2 second when the header
    is visible then the header will disappear and this code detects if any key or any movement or scrolling happens
    and if any of these happens it will reset the 2 second timer therefore not hiding the header

  */
  // Code to hide header after 2 seconds of no scrolling
  const header = document.querySelector('.page__header');
  let isScrolling;
  let isIdle;
  let lastScrollTop = 0;
  const idleTimeout = 2000; // 2 seconds

  // Show the header when the page loads
  header.classList.remove('hidden');

  // Handle scroll event
  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear previous timeout
    clearTimeout(isIdle);

    // Show the header when scrolling
    header.classList.remove('hidden');

    // Set a timeout to hide the header after idle time
    isIdle = setTimeout(function () {
      if (scrollTop !== 0) {
        header.classList.add('hidden');
      }
    }, idleTimeout);

    // Detect if scrolling up or down
    if (scrollTop > lastScrollTop && scrollTop !== 0) {
      // Scrolling down
      header.classList.add('hidden');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // Ensure the header stays visible if at the top of the page
  window.addEventListener('scroll', function () {
    if (window.pageYOffset === 0) {
      header.classList.remove('hidden');
    }
  });

  // Handle mousemove and keypress events to reset idle timer
  const resetIdleTimer = function () {
    clearTimeout(isIdle);
    if (window.pageYOffset !== 0) {
      header.classList.remove('hidden');
    }
    isIdle = setTimeout(function () {
      if (window.pageYOffset !== 0) {
        header.classList.add('hidden');
      }
    }, idleTimeout);
  };

  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('keypress', resetIdleTimer);
  
  //This function makes the Back to top button appear if the user scrolled below the fold of the page and disappear if at the top of the page.
  const topButton = document.querySelector('.top');

  // Function to toggle the visibility of the top button based on scroll position
  function toggleTopButtonVisibility() {
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
      topButton.style.opacity = '1';
      topButton.style.pointerEvents = 'unset';
    } else {
      topButton.style.opacity = '0';
      topButton.style.pointerEvents = 'none';
    }
  }

  // Initial check on page load
  toggleTopButtonVisibility();
  // This checks if the user has clicked the top buttons and if they does it will redirect them to the top of the page with the smooth scrolling effect
  // Add scroll event listener to toggle visibility
  window.addEventListener('scroll', toggleTopButtonVisibility);

  // Functionality to scroll to top when top button is clicked
  topButton.addEventListener('click', function () {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});