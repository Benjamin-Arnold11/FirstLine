// Sidebar collapse
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const sectionTitle = document.getElementById('section-title');
  const sectionText = document.getElementById('section-text');
  const buttons = document.querySelectorAll('.nav-btn');

  // Collapse toggle
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Sidebar section data
  const sections = {
    intro: {
      title: "Introduction",
      text: `Welcome to your Python learning journey! 🐍<br><br>
Python is one of the most popular programming languages in the world because it’s easy to learn and very powerful.<br><br>
In this course, you’ll explore how to write programs, display text, use variables, handle loops, and more.<br><br>
Use the sidebar to navigate between topics and try code examples directly in the editor on the right!`
    },
    hello: {
      title: "Hello World",
      text: `The first thing to learn in Python is how to display something on screen.<br><br>
To do this, we use the <b>print()</b> function.<br><br>
Example:<br>
<code>print("Hello World")</code><br><br>
Whatever is inside the quotation marks will appear as text when you run the program.`
    },
    comments: {
      title: "Comments",
      text: `Comments are lines in your code that Python ignores — they’re for you to leave notes or explanations.<br><br>
To write a comment, start the line with a <b>#</b> symbol.<br><br>
Example:<br>
<code># This is a comment<br>print("Hello!")</code><br><br>
Comments help make your code easier to read and understand.`
    },
    variables: {
      title: "Variables",
      text: `Variables are like boxes that store information.<br><br>
You can assign text, numbers, or other data to them.<br><br>
Example:<br>
<code>name = "Alex"<br>print("Hello", name)</code><br><br>
This program stores the text "Alex" inside <b>name</b> and then prints it.`
    },
    integers: {
      title: "Integers",
      text: `Integers are whole numbers — like 1, 2, -5, or 1000.<br><br>
You can perform math with them using +, -, *, and /.<br><br>
Example:<br>
<code>a = 5<br>b = 3<br>print(a + b)</code><br><br>
This would display <b>8</b>.`
    },
    decimals: {
      title: "Decimals",
      text: `Decimals (called <b>floats</b> in Python) are numbers with decimal points.<br><br>
Example:<br>
<code>price = 4.99<br>tax = 0.5<br>print(price + tax)</code><br><br>
Python can calculate and combine these easily.`
    },
    strings: {
      title: "Strings",
      text: `Strings are pieces of text enclosed in quotation marks.<br><br>
Example:<br>
<code>greeting = "Hello!"<br>print(greeting)</code><br><br>
You can combine (concatenate) strings too:<br>
<code>print("Hello " + "World")</code>`
    },
    loops: {
      title: "Loops",
      text: `Loops let your code repeat actions automatically.<br><br>
Example:<br>
<code>for i in range(5):<br> print("Hi!")</code><br><br>
This will print “Hi!” five times.`
    },
    forloop: {
      title: "For Loop",
      text: `A <b>for</b> loop repeats a set of instructions for each item in a sequence.<br><br>
Example:<br>
<code>for i in range(3):<br> print("Loop number", i)</code><br><br>
This will print numbers 0, 1, and 2.`
    },
    whileloop: {
      title: "While Loop",
      text: `A <b>while</b> loop repeats as long as a condition is true.<br><br>
Example:<br>
<code>count = 0<br>while count &lt; 5:<br> print(count)<br> count += 1</code><br><br>
Be careful — if your condition never becomes false, it loops forever!`
    }
  };

  // Sidebar button click
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sectionKey = btn.getAttribute('data-section');
      if (sections[sectionKey]) {
        sectionTitle.textContent = sections[sectionKey].title;
        sectionText.innerHTML = sections[sectionKey].text;
      }
    });
  });
});
