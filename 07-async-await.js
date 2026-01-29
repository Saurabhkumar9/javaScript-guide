console.log("=== ASYNC/AWAIT & PROMISES ===");

// Callback Hell (The Problem)
function getUserData(userId, callback) {
    setTimeout(() => {
        console.log(`Fetched user ${userId}`);
        callback({ id: userId, name: "John Doe" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        console.log(`Fetched posts for user ${userId}`);
        callback([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        console.log(`Fetched comments for post ${postId}`);
        callback([{ id: 1, text: "Great post!" }]);
    }, 1000);
}

// Callback Hell Example
console.log("Callback Hell Example:");
getUserData(1, function(user) {
    getUserPosts(user.id, function(posts) {
        getPostComments(posts[0].id, function(comments) {
            console.log("Callback Hell Result:", { user, posts, comments });
        });
    });
});

// ================================================
// PROMISES (Solution to Callback Hell)

// Creating a Promise
function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Promise: Fetched user ${userId}`);
            if (userId > 0) {
                resolve({ id: userId, name: "John Doe", email: "john@example.com" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function getUserPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Promise: Fetched posts for user ${userId}`);
            resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]);
        }, 1000);
    });
}

function getPostCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Promise: Fetched comments for post ${postId}`);
            resolve([{ id: 1, text: "Great post!" }]);
        }, 1000);
    });
}

// Promise Chaining
console.log("\nPromise Chaining Example:");
getUserDataPromise(1)
    .then(user => {
        console.log("User data received:", user);
        return getUserPostsPromise(user.id);
    })
    .then(posts => {
        console.log("User posts received:", posts);
        return getPostCommentsPromise(posts[0].id);
    })
    .then(comments => {
        console.log("Post comments received:", comments);
        console.log("Promise Chain Complete!");
    })
    .catch(error => {
        console.error("Error in promise chain:", error.message);
    })
    .finally(() => {
        console.log("Promise chain finished (cleanup)");
    });

// Promise.all - Wait for all promises
console.log("\nPromise.all Example:");
Promise.all([
    getUserDataPromise(1),
    getUserDataPromise(2),
    getUserDataPromise(3)
])
.then(users => {
    console.log("All users fetched:", users);
})
.catch(error => {
    console.error("Error fetching users:", error);
});

// Promise.race - First to resolve/reject
console.log("\nPromise.race Example:");
const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), 500);
});

Promise.race([
    getUserDataPromise(1),
    timeoutPromise
])
.then(user => {
    console.log("Race winner (user):", user);
})
.catch(error => {
    console.error("Race error:", error.message);
});

// Promise.allSettled - Wait for all to settle (resolve or reject)
console.log("\nPromise.allSettled Example:");
Promise.allSettled([
    getUserDataPromise(1),
    getUserDataPromise(0), // This will reject
    getUserDataPromise(3)
])
.then(results => {
    console.log("All settled results:");
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Promise ${index}: Success -`, result.value);
        } else {
            console.log(`Promise ${index}: Failed -`, result.reason.message);
        }
    });
});

// Promise.any - First to resolve (ignores rejects)
console.log("\nPromise.any Example:");
const rejectPromise = Promise.reject(new Error("Failed immediately"));
const slowPromise = new Promise(resolve => {
    setTimeout(() => resolve("Slow promise"), 2000);
});
const fastPromise = new Promise(resolve => {
    setTimeout(() => resolve("Fast promise"), 500);
});

Promise.any([rejectPromise, slowPromise, fastPromise])
    .then(firstResult => {
        console.log("First successful promise:", firstResult);
    })
    .catch(errors => {
        console.error("All promises rejected:", errors);
    });

// ================================================
// ASYNC/AWAIT (Syntactic sugar for Promises)

async function fetchUserData() {
    try {
        console.log("\nAsync/Await Example:");
        
        const user = await getUserDataPromise(1);
        console.log("Async: User fetched:", user);
        
        const posts = await getUserPostsPromise(user.id);
        console.log("Async: Posts fetched:", posts);
        
        const comments = await getPostCommentsPromise(posts[0].id);
        console.log("Async: Comments fetched:", comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Async/Await Error:", error.message);
        throw error;
    } finally {
        console.log("Async/Await cleanup complete");
    }
}

// Using async/await
fetchUserData().then(result => {
    console.log("Async/Await Final Result:", result);
});

// Async function with Promise.all
async function fetchMultipleUsers() {
    try {
        console.log("\nAsync with Promise.all:");
        const [user1, user2, user3] = await Promise.all([
            getUserDataPromise(1),
            getUserDataPromise(2),
            getUserDataPromise(3)
        ]);
        console.log("Multiple users fetched:", [user1, user2, user3]);
        return [user1, user2, user3];
    } catch (error) {
        console.error("Error fetching multiple users:", error);
    }
}

// Async function expression
const fetchData = async (userId) => {
    const user = await getUserDataPromise(userId);
    return `User: ${user.name}`;
};

// Async arrow function
const processUser = async userId => {
    const user = await getUserDataPromise(userId);
    return { processed: true, ...user };
};

// Error handling in async/await
async function handleErrors() {
    try {
        const user = await getUserDataPromise(0); // This will reject
        console.log("This won't execute");
    } catch (error) {
        console.error("Caught error:", error.message);
        // You can re-throw or handle the error
        // throw error; // Re-throw if needed
    }
}

// Async IIFE (Immediately Invoked Function Expression)
(async () => {
    console.log("\nAsync IIFE:");
    try {
        const user = await getUserDataPromise(1);
        console.log("IIFE User:", user);
    } catch (error) {
        console.error("IIFE Error:", error);
    }
})();

// ================================================
// ADVANCED PATTERNS

// Retry Pattern with Promises
function retryOperation(operation, maxRetries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        let retries = 0;
        
        function attempt() {
            operation()
                .then(resolve)
                .catch(error => {
                    retries++;
                    if (retries < maxRetries) {
                        console.log(`Retry ${retries}/${maxRetries} after ${delay}ms`);
                        setTimeout(attempt, delay);
                    } else {
                        reject(new Error(`Failed after ${maxRetries} retries: ${error.message}`));
                    }
                });
        }
        
        attempt();
    });
}

// Timeout Pattern
function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Operation timeout")), timeoutMs);
        })
    ]);
}

// Testing advanced patterns
console.log("\n=== ADVANCED PATTERNS ===");

// Retry example
const failingOperation = () => new Promise((resolve, reject) => {
    const shouldFail = Math.random() > 0.7;
    if (shouldFail) {
        reject(new Error("Random failure"));
    } else {
        resolve("Success!");
    }
});

retryOperation(failingOperation, 3, 500)
    .then(result => console.log("Retry succeeded:", result))
    .catch(error => console.error("Retry failed:", error.message));

// Timeout example
withTimeout(getUserDataPromise(1), 500)
    .then(user => console.log("Timeout success:", user))
    .catch(error => console.error("Timeout error:", error.message));