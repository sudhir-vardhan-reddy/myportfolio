function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');

  if (!menu || !icon) {
    // console.error("Menu or Icon not found!");
    return;
  }

  menu.classList.toggle('open');
  icon.classList.toggle('open');

  // Debugging: Check menu state
  // console.log("Menu toggled:", menu.classList.contains("open"));
}

// Animation class---------------------------------------------------------------------------

// Initialize animation classes
function initializeAnimations() {
  // Add animation classes to sections
  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('animate-on-scroll');
  });

  // Add specific animations to elements
  // Profile section
  const profilePic = document.querySelector('#profile .section__pic-container');
  const profileText = document.querySelector('#profile .section__text');
  profilePic?.classList.add('slide-in-left');
  profileText?.classList.add('slide-in-right');

  // About section
  const aboutPic = document.querySelector('#about .section__pic-container');
  const aboutDetails = document.querySelector('.about-details-container');
  aboutPic?.classList.add('slide-in-left');
  aboutDetails?.classList.add('slide-in-right');

  // Add stagger effect to about containers
  const aboutContainers = document.querySelector('.about-containers');
  aboutContainers?.classList.add('stagger-children');
  aboutContainers
    ?.querySelectorAll('.details-container')
    .forEach((container) => {
      container.classList.add('fade-in');
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
}

// Function to handle scroll animations
function handleScrollAnimations() {
  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .slide-in-left, .slide-in-right, .fade-in'
  );

  animatedElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add('active');
    } else {
      // Remove active class when element is out of viewport
      element.classList.remove('active');
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  handleScrollAnimations(); // Initial check for visible elements
});

// Add scroll event listener with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    handleScrollAnimations();
  });
});

// Handle animations on resize
window.addEventListener('resize', handleScrollAnimations);

function createTrainingBar() {
  const trainingBar = document.getElementById('trainingBar');
  const viewportHeight = window.innerHeight; // Height of the viewport
  const charCount = Math.floor(viewportHeight / 6); // Adjust characters based on viewport

  trainingBar.innerHTML = '';
  for (let i = 0; i < charCount; i++) {
    const char = document.createElement('div');
    char.className = 'char incomplete';
    char.textContent = '.';
    trainingBar.appendChild(char);
  }
}

function updateProgress() {
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight; // Total scrollable height
  const scrolled = window.scrollY;
  const progress = scrolled / scrollHeight; // Percentage of scroll completed

  const trainingBar = document.getElementById('trainingBar');
  const chars = trainingBar.getElementsByClassName('char');
  const completedCount = Math.floor(chars.length * progress);

  for (let i = 0; i < chars.length; i++) {
    if (i < completedCount) {
      chars[i].textContent = '=';
      chars[i].className = 'char complete';
    } else if (i === completedCount) {
      chars[i].textContent = '>';
      chars[i].className = 'char current';
    } else {
      chars[i].textContent = '.';
      chars[i].className = 'char incomplete';
    }
  }

  // Update metrics display
  const totalEpochs = 6877;
  const currentEpoch = Math.floor(progress * totalEpochs);
  const eta = Math.ceil(((totalEpochs - currentEpoch) * 2.146) / totalEpochs);

  document.getElementById(
    'progress-text'
  ).textContent = `${currentEpoch}/${totalEpochs} [${Array(20)
    .fill('=')
    .slice(0, Math.floor(progress * 20))
    .join('')}${Array(20)
    .fill('.')
    .slice(Math.floor(progress * 20))
    .join('')}] - ${(progress * 100).toFixed(1)}%`;
  document.getElementById('eta-text').textContent = `ETA: ${eta}s`;
}

// Initialize and update on scroll/resize
createTrainingBar();
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', () => {
  createTrainingBar();
  updateProgress();
});
updateProgress();

// function for project pop up--------------------------------------------------

function openFullscreenModal(id) {
  document.getElementById(id).style.display = 'flex';
}

// Function to close fullscreen modal
function closeFullscreenModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside the content
window.onclick = function (event) {
  const modals = document.querySelectorAll('.fullscreen-modal');
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

//  function for achievements pop up -----------------------------------------------
// Sample data for achievements
const achievements = [
  {
    id: 1,
    title: 'TikTok TechJam 2024',
    image: './assets/tiktok_hackathon.jpg',
    description:
      "Participating in the TikTok TechJam 2024 was an unforgettable journey that I'm thrilled to share. As a graduate student at the Illinois Institute of Technology, specializing in Python, Docker, Kubernetes, and Full-Stack Web Development (MERN Stack), this experience pushed me to new heights both technically and professionally.'\n Our team's journey began with a month of intense preparation, filled with late nights and passionate collaboration. All our hard work culminated in a presentation at the ByteDance TikTok office in San Jose. It was an incredible honor to be selected as one of the top 12 teams out of more than 2,200 participants. While we didn't make it to the top 5, the experience we gained was invaluable, showcasing not only our technical skills but also our ability to work together effectively under pressure.'\n The challenges we faced throughout the hackathon taught us important lessons that will undoubtedly shape our future endeavors. We improved not only our technical capabilities but also our teamwork and problem-solving skills. This experience reinforced the importance of resilience and creativity, pushing us to innovate and dream bigger.'\n I am incredibly grateful to my amazing teammates—Sachin Shivanna, Harshith Deshalli Ravi, Pallavi Savant, and Nishchal G R. Their dedication and hard work brought our project to life. A special thanks goes to Nishchal for his critical contributions and unwavering support throughout the process, even when he couldn't be present for the final presentation. Our mentors also played a crucial role, providing invaluable advice and motivation that inspired us throughout our journey.'\n The connections made at the TikTok office were another highlight of this experience. I'm thankful for the support and encouragement from Niranjhan Kantharaj, Vini Jaiswal, Jingru H., and Patrick Deguzman. Their insights and feedback were instrumental in our growth during the hackathon.'\n As I look forward to future opportunities, I carry with me the lessons learned from this experience. I'm excited to continue pushing the boundaries of what can be achieved in technology and innovation. The TikTok TechJam 2024 has been a significant milestone in my career path, and I'm eager to apply these experiences in my future roles. This journey has reinforced my passion for technology and my commitment to continuous learning and growth in the field.",
    collaborators: [
      'Sachin Shivanna',
      'Pallavi Savant',
      'Nishchal Gante Ravesh',
      'Suhas Palani',
    ],
  },
  {
    id: 2,
    title: 'Orahacks',
    image: './assets/orahacks_hackathon.jpeg',
    description:
      "Participating in the OraHacks Chicago hackathon, hosted by Drive Capital, was an exhilarating experience that I'm proud to share. As a team, we embarked on a 72-hour journey of intense innovation, learning, and problem-solving that ultimately led to our victory.'\n The hackathon presented us with numerous challenges that pushed our technical skills and creativity to the limit. Throughout the event, we worked tirelessly, leveraging our diverse expertise and collaborating seamlessly to overcome obstacles. The support and guidance from mentors were invaluable, providing us with fresh perspectives and insights that significantly contributed to our success.'\n One of the most rewarding aspects of this experience was the opportunity to bond with my teammates. As we navigated the highs and lows of the hackathon together, we developed a strong sense of camaraderie and mutual respect. Our ability to work cohesively under pressure was a key factor in our victory, and I'm grateful for the chance to have worked alongside such talented individuals.'\n The organizers, mentors, and volunteers of OraHacks deserve special recognition for creating such a dynamic and supportive environment. Their dedication and hard work ensured that all participants had the resources and guidance needed to excel. I'm particularly thankful to Landon W. Campbell, Elijah Olasunkanmi, Jessica Yip, Puii Jaiwijitr, Roshaan Siddiqui, Tushnik Goswami, Anish Dalal, Nikhil Vimal, Nitin Murali, and the entire team for their efforts in making this event a success.'\n I'd like to extend a heartfelt thank you to Jacob Anderson, CEO of BRX.ai, whose mentorship was instrumental in our journey to victory. His insights and guidance were crucial in helping us refine our ideas and overcome challenges throughout the hackathon.'\n This experience at OraHacks Chicago has been a significant milestone in my professional development. It has not only honed my technical skills but also enhanced my ability to work effectively in a team under pressure. The lessons learned and connections made during this event will undoubtedly shape my future endeavors in the tech industry.'\n As I reflect on this achievement, I'm filled with excitement for what the future holds. The skills, experiences, and relationships forged during this hackathon have opened up new possibilities and ignited a renewed passion for innovation. I look forward to applying these learnings in future projects and continuing to push the boundaries of what's possible in technology.",
    collaborators: [
      'Sachin Shivanna',
      'Pallavi Savant',
      'Nishchal Gante Ravesh',
      'Suhas Palani',
    ],
  },
  {
    id: 3,
    title: 'Google AI hackathon',
    image: './assets/googleaihackathon.png',
    description:
      "Participating in the Google AI Hackathon, hosted on Devpost, was an exhilarating month-long journey that pushed our team to new heights. This online event drew over 15,000 participants from around the globe, creating a highly competitive and innovative environment. Our team's dedication, creativity, and technical prowess were put to the test as we developed cutting-edge AI solutions to address real-world challenges. Through countless hours of collaboration, problem-solving, and iterative development, we managed to secure a place in the top 25 teams. This achievement not only validated our skills and hard work but also provided us with invaluable experience in applying AI technologies to practical problems. The exposure to diverse ideas and the opportunity to learn from industry experts throughout the hackathon has significantly enhanced our understanding of AI's potential and its applications across various domains.",
    collaborators: ['Amith Ramaswamy'],
  },
  {
    id: 4,
    title: 'KSIT State India Hackathon',
    image: './assets/ksit_hackathon.jpeg',
    description:
      "In 2022, I had the incredible opportunity to participate in the KSIT State India Hackathon, a thrilling 24-hour offline event that brought together some of the brightest minds from across Karnataka. Our team's dedication and innovative spirit were put to the test as we competed against 70 other teams from various institutions throughout the state. The atmosphere was electric, filled with a palpable sense of excitement and creativity as participants worked tirelessly to develop groundbreaking solutions. Throughout the hackathon, we had the chance to interact with a diverse group of talented individuals, exchanging ideas and forging new connections that continue to inspire us today. Our hard work and collaboration paid off as we secured the second place in this highly competitive event. This achievement not only validated our technical skills but also reinforced the importance of teamwork and perseverance in the face of challenging time constraints. The KSIT State India Hackathon was more than just a competition; it was a transformative experience that broadened our perspectives and fueled our passion for innovation in technology.",
    collaborators: ['Amith Ramaswamy', 'Vaishnav'],
  },
  {
    id: 5,
    title: 'Global Academy State India Hackathon 2022',
    image: './assets/global_hacathon.jpeg',
    description:
      "In 2022, I had the privilege of participating in an exhilarating 24-hour offline hackathon that brought together some of the brightest minds from across Karnataka. Our team's dedication and innovative spirit were put to the test as we competed against over 100 teams from various institutions throughout the state. The atmosphere was electric, filled with a palpable sense of excitement and creativity as participants worked tirelessly to develop groundbreaking solutions. Our project, which focused on developing an AI-powered social media content filter using CNN and RNN technologies, stood out for its potential social impact and earned us the title of 'Most Appreciated Team.' Throughout the hackathon, we had the chance to interact with a diverse group of talented individuals, exchanging ideas and forging new connections that continue to inspire us today. Our hard work and collaboration paid off as we secured third place in this highly competitive event. This achievement not only validated our technical skills but also reinforced the importance of applying technology to address pressing social issues. The hackathon was more than just a competition; it was a transformative experience that broadened our perspectives and fueled our passion for using AI to create positive change in society.",
    collaborators: ['Amith Ramaswamy', 'Vaishnav'],
  },
  {
    id: 6,
    title: 'Hackathons I participated over the years',
    image: './assets/hackathon.png',
    description:
      "Global Academy of Technology State India Hackathon - 2022 '\n KSIT State India Hackathon - 2022 '\n Reva Hackathon - 2022 '\n Mysore Institute of Technology State India Hackathon - 2022 '\n Global Academy of Technology State India Hackathon - 2023 '\n KSIT Gamathon - 2023 '\n OraHacks Chicago - 2024 '\n Scarlet-Hacks - 2024 '\n  Google AI Hackathon - 2024 '\n Microsoft Generative AI Hackathon - 2024 '\n Snowflake-Streamlit Hackathon - 2024 '\n TikTok TechJam - 2024",
    collaborators: [
      'Amith Ramaswamy',
      'Vaishnav',
      'Sachin Shivanna',
      'Pallavi Savant',
      'Nishchal Gante Ravesh',
      'Suhas Palani',
      'Sohan Mahadev',
      'Shanthanu',
    ],
  },
];

// Open modal with achievement details
function openAchievement(id) {
  const achievement = achievements.find((item) => item.id === id);
  if (!achievement) return;

  // Populate modal content
  document.getElementById('modal-title').innerText = achievement.title;
  document.getElementById('modal-image').src = achievement.image;
  document.getElementById('modal-description').innerText =
    achievement.description;

  // Populate collaborators
  const collaboratorsList = document.getElementById('modal-collaborators');
  collaboratorsList.innerHTML = ''; // Clear existing list
  achievement.collaborators.forEach((collaborator) => {
    const li = document.createElement('li');
    li.innerText = collaborator;
    collaboratorsList.appendChild(li);
  });

  // Show the modal
  document.getElementById('achievement-modal').style.display = 'flex';
}

// Close the modal
function closeAchievement() {
  document.getElementById('achievement-modal').style.display = 'none';
}


// contact form

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const formStatus = document.getElementById("form-status");
  formStatus.textContent = "Sending message...";
  formStatus.style.color = "blue"; // Indicate processing state

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  // Initialize EmailJS
  emailjs.init("dYismGPbwaMFFeSO4");  // Replace with your EmailJS Public Key

  // Send Email using predefined recipient in EmailJS template
  emailjs.send("service_vr3vz3f", "template_70ottil", {
      to_email: "sudhirvardhan01@gmail.com",  // Set recipient manually
      name: name,
      email: email,
      subject: title,
      message: message
  })
  .then(() => {
      formStatus.textContent = "Message sent successfully!";
      formStatus.style.color = "green";
      document.getElementById("contact-form").reset();
  })
  .catch((error) => {
      formStatus.textContent = "Failed to send message. Try again.";
      formStatus.style.color = "red";
      console.error("Error:", error);
  });
});
