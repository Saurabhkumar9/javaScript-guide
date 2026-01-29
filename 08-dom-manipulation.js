// DOM Manipulation Examples
// Note: Run this in a browser environment

console.log("=== DOM MANIPULATION ===");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================================
    // SELECTING ELEMENTS
    
    console.log("\n=== SELECTING ELEMENTS ===");
    
    // By ID
    const titleElement = document.getElementById('title');
    console.log("Element by ID:", titleElement);
    
    // By Class Name (returns HTMLCollection)
    const items = document.getElementsByClassName('item');
    console.log("Elements by Class:", items);
    
    // By Tag Name (returns HTMLCollection)
    const paragraphs = document.getElementsByTagName('p');
    console.log("Elements by Tag:", paragraphs);
    
    // Query Selector (first matching element)
    const firstItem = document.querySelector('.item');
    console.log("First .item:", firstItem);
    
    // Query Selector All (all matching elements - NodeList)
    const allItems = document.querySelectorAll('.item');
    console.log("All .items:", allItems);
    
    // By Name attribute
    const forms = document.getElementsByName('myForm');
    console.log("Elements by Name:", forms);
    
    // ================================================
    // CREATING AND MODIFYING ELEMENTS
    
    console.log("\n=== CREATING ELEMENTS ===");
    
    // Create new element
    const newDiv = document.createElement('div');
    newDiv.id = 'new-div';
    newDiv.className = 'container highlighted';
    
    // Set attributes
    newDiv.setAttribute('data-custom', 'value');
    newDiv.setAttribute('title', 'Tooltip text');
    
    // Add text content
    newDiv.textContent = 'Hello, I am a new div!';
    
    // Add HTML content (be careful with user input!)
    newDiv.innerHTML = '<strong>Bold text</strong> and <em>italic text</em>';
    
    // Create text node
    const textNode = document.createTextNode(' Just plain text.');
    newDiv.appendChild(textNode);
    
    // Add to document
    document.body.appendChild(newDiv);
    
    // ================================================
    // MODIFYING ELEMENTS
    
    console.log("\n=== MODIFYING ELEMENTS ===");
    
    // Style manipulation
    newDiv.style.backgroundColor = '#f0f0f0';
    newDiv.style.padding = '20px';
    newDiv.style.border = '1px solid #ccc';
    newDiv.style.borderRadius = '5px';
    newDiv.style.margin = '10px 0';
    
    // Toggle class
    newDiv.classList.add('new-class');
    newDiv.classList.remove('highlighted');
    newDiv.classList.toggle('active'); // Adds
    newDiv.classList.toggle('active'); // Removes
    
    // Check class
    console.log("Has class 'container'?", newDiv.classList.contains('container'));
    
    // Replace class
    newDiv.classList.replace('container', 'wrapper');
    
    // ================================================
    // TRAVERSING THE DOM
    
    console.log("\n=== TRAVERSING DOM ===");
    
    // Parent
    const parent = newDiv.parentNode;
    console.log("Parent:", parent);
    
    // Children
    const children = newDiv.children;
    console.log("Children:", children);
    
    // First and last child
    const firstChild = newDiv.firstElementChild;
    const lastChild = newDiv.lastElementChild;
    console.log("First child:", firstChild);
    console.log("Last child:", lastChild);
    
    // Siblings
    const nextSibling = newDiv.nextElementSibling;
    const previousSibling = newDiv.previousElementSibling;
    console.log("Next sibling:", nextSibling);
    console.log("Previous sibling:", previousSibling);
    
    // ================================================
    // EVENT HANDLING
    
    console.log("\n=== EVENT HANDLING ===");
    
    // Create button for event examples
    const button = document.createElement('button');
    button.textContent = 'Click Me!';
    button.id = 'demo-button';
    button.style.padding = '10px 20px';
    button.style.margin = '10px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    document.body.appendChild(button);
    
    // Event listener with function
    button.addEventListener('click', function(event) {
        console.log('Button clicked!', event);
        this.style.backgroundColor = '#28a745';
    });
    
    // Multiple events
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.2s';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
    
    // Event delegation example
    const list = document.createElement('ul');
    list.id = 'item-list';
    
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        li.textContent = `Item ${i}`;
        li.className = 'list-item';
        li.dataset.id = i;
        list.appendChild(li);
    }
    
    document.body.appendChild(list);
    
    // Event delegation - single listener for multiple items
    list.addEventListener('click', function(event) {
        if (event.target.classList.contains('list-item')) {
            console.log(`Clicked item ${event.target.dataset.id}`);
            event.target.style.backgroundColor = '#ffeb3b';
        }
    });
    
    // Form event example
    const form = document.createElement('form');
    form.id = 'demo-form';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type something...';
    input.id = 'demo-input';
    input.style.padding = '8px';
    input.style.margin = '10px';
    input.style.width = '200px';
    
    form.appendChild(input);
    document.body.appendChild(form);
    
    // Input events
    input.addEventListener('input', (event) => {
        console.log('Input value:', event.target.value);
    });
    
    input.addEventListener('change', (event) => {
        console.log('Value changed:', event.target.value);
    });
    
    input.addEventListener('focus', () => {
        input.style.border = '2px solid #007bff';
    });
    
    input.addEventListener('blur', () => {
        input.style.border = '1px solid #ccc';
    });
    
    // Keyboard events
    input.addEventListener('keydown', (event) => {
        console.log('Key pressed:', event.key);
        if (event.key === 'Enter') {
            console.log('Enter pressed!');
        }
    });
    
    // ================================================
    // FORM HANDLING
    
    console.log("\n=== FORM HANDLING ===");
    
    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';
    contactForm.style.padding = '20px';
    contactForm.style.border = '1px solid #ddd';
    contactForm.style.borderRadius = '5px';
    contactForm.style.maxWidth = '400px';
    contactForm.style.margin = '20px auto';
    
    // Create form fields
    const fields = [
        { type: 'text', id: 'name', label: 'Name:', required: true },
        { type: 'email', id: 'email', label: 'Email:', required: true },
        { type: 'textarea', id: 'message', label: 'Message:', rows: 4 }
    ];
    
    fields.forEach(field => {
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;
        label.style.display = 'block';
        label.style.margin = '10px 0 5px';
        
        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = field.rows;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.id = field.id;
        input.name = field.id;
        input.required = field.required || false;
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.marginBottom = '15px';
        input.style.boxSizing = 'border-box';
        
        contactForm.appendChild(label);
        contactForm.appendChild(input);
    });
    
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.style.padding = '10px 20px';
    submitButton.style.backgroundColor = '#28a745';
    submitButton.style.color = 'white';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    
    contactForm.appendChild(submitButton);
    document.body.appendChild(contactForm);
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        
        // Validation
        if (!data.name || !data.email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Form submitted successfully!';
        successMsg.style.color = 'green';
        successMsg.style.marginTop = '10px';
        successMsg.style.fontWeight = 'bold';
        
        this.appendChild(successMsg);
        
        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            successMsg.remove();
        }, 2000);
    });
    
    // ================================================
    // AJAX/FETCH API
    
    console.log("\n=== AJAX/FETCH ===");
    
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Fetch Data';
    fetchButton.id = 'fetch-button';
    fetchButton.style.padding = '10px 20px';
    fetchButton.style.margin = '10px';
    fetchButton.style.backgroundColor = '#17a2b8';
    fetchButton.style.color = 'white';
    fetchButton.style.border = 'none';
    fetchButton.style.borderRadius = '5px';
    fetchButton.style.cursor = 'pointer';
    
    const dataDisplay = document.createElement('div');
    dataDisplay.id = 'data-display';
    dataDisplay.style.margin = '20px';
    dataDisplay.style.padding = '15px';
    dataDisplay.style.border = '1px solid #ddd';
    dataDisplay.style.borderRadius = '5px';
    dataDisplay.style.minHeight = '100px';
    
    document.body.appendChild(fetchButton);
    document.body.appendChild(dataDisplay);
    
    fetchButton.addEventListener('click', async () => {
        try {
            fetchButton.disabled = true;
            fetchButton.textContent = 'Loading...';
            dataDisplay.textContent = 'Loading data...';
            
            // Fetch data from JSONPlaceholder API
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Display data
            dataDisplay.innerHTML = `
                <h3>Fetched Post</h3>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Body:</strong> ${data.body}</p>
            `;
            
            console.log('Fetched data:', data);
            
        } catch (error) {
            console.error('Fetch error:', error);
            dataDisplay.textContent = `Error: ${error.message}`;
            dataDisplay.style.color = 'red';
        } finally {
            fetchButton.disabled = false;
            fetchButton.textContent = 'Fetch Data';
        }
    });
    
    // ================================================
    // LOCAL STORAGE
    
    console.log("\n=== LOCAL STORAGE ===");
    
    const storageDiv = document.createElement('div');
    storageDiv.innerHTML = `
        <h3>Local Storage Demo</h3>
        <input type="text" id="storage-input" placeholder="Enter text to save">
        <button id="save-btn">Save to Local Storage</button>
        <button id="load-btn">Load from Local Storage</button>
        <button id="clear-btn">Clear Local Storage</button>
        <div id="storage-output" style="margin-top: 10px;"></div>
    `;
    
    document.body.appendChild(storageDiv);
    
    const storageInput = document.getElementById('storage-input');
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');
    const clearBtn = document.getElementById('clear-btn');
    const storageOutput = document.getElementById('storage-output');
    
    // Save to local storage
    saveBtn.addEventListener('click', () => {
        const value = storageInput.value.trim();
        if (value) {
            localStorage.setItem('demoText', value);
            storageOutput.textContent = 'Saved to local storage!';
            storageOutput.style.color = 'green';
        }
    });
    
    // Load from local storage
    loadBtn.addEventListener('click', () => {
        const savedValue = localStorage.getItem('demoText');
        if (savedValue) {
            storageInput.value = savedValue;
            storageOutput.textContent = `Loaded: ${savedValue}`;
            storageOutput.style.color = 'blue';
        } else {
            storageOutput.textContent = 'No data found in local storage';
            storageOutput.style.color = 'orange';
        }
    });
    
    // Clear local storage
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('demoText');
        storageInput.value = '';
        storageOutput.textContent = 'Local storage cleared!';
        storageOutput.style.color = 'red';
    });
    
    // ================================================
    // ANIMATIONS
    
    console.log("\n=== ANIMATIONS ===");
    
    const animateButton = document.createElement('button');
    animateButton.textContent = 'Animate Box';
    animateButton.style.margin = '10px';
    animateButton.style.padding = '10px 20px';
    
    const animatedBox = document.createElement('div');
    animatedBox.id = 'animated-box';
    animatedBox.style.width = '100px';
    animatedBox.style.height = '100px';
    animatedBox.style.backgroundColor = '#ff6b6b';
    animatedBox.style.margin = '20px';
    animatedBox.style.borderRadius = '5px';
    animatedBox.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(animateButton);
    document.body.appendChild(animatedBox);
    
    let isAnimated = false;
    
    animateButton.addEventListener('click', () => {
        if (!isAnimated) {
            animatedBox.style.transform = 'translateX(200px) rotate(180deg) scale(1.5)';
            animatedBox.style.backgroundColor = '#4ecdc4';
            animatedBox.style.borderRadius = '50%';
        } else {
            animatedBox.style.transform = 'translateX(0) rotate(0) scale(1)';
            animatedBox.style.backgroundColor = '#ff6b6b';
            animatedBox.style.borderRadius = '5px';
        }
        isAnimated = !isAnimated;
    });
    
    console.log("DOM Manipulation examples ready!");
});

// Helper function for when DOM is not available
if (typeof document === 'undefined') {
    console.log("Note: DOM manipulation examples require a browser environment.");
    console.log("Run this file in a browser or with a DOM environment like jsdom.");
}