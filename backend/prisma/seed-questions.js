const prisma = require('../src/config/db');

const USER_QUESTIONS = [
  {
    "text": "Swap two numbers using operator.",
    "hint": "Think about operators (e.g. arithmetic + and -, or bitwise XOR ^)",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int a = 5, b = 10; a = a ^ b; b = a ^ b; a = a ^ b; cout << a << ' ' << b;",
    "isActive": true
  },
  {
    "text": "Find the sum of first N natural numbers",
    "hint": "Use a loop from 1 to N and keep adding each number to a variable initialized to 0",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n, sum = 0; cin >> n; for (int i = 1; i <= n; i++) sum += i; cout << sum;",
    "isActive": true
  },
  {
    "text": "Multiply the number by itself and print the result",
    "hint": "Take a number as input and multiply it by itself",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n; cin >> n; cout << n * n;",
    "isActive": true
  },
  {
    "text": "Find the last digit of a number",
    "hint": "Use the modulus (%) operator with 10 to get the last digit.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n; cin >> n; cout << n % 10;",
    "isActive": true
  },
  {
    "text": "Print a triangle where each row contains consecutive numbers starting from 1",
    "hint": "Use nested loops. The outer loop controls rows, inner loop prints numbers from 1 to row number.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n; cin >> n; for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) cout << j << ' '; cout << endl; }",
    "isActive": true
  },
  {
    "text": "Print a centered pyramid using stars",
    "hint": "Use two inner loops: spaces (n-i) and stars (2*i-1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n; cin >> n; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n - i; j++) cout << ' '; for (int j = 1; j <= 2 * i - 1; j++) cout << '*'; cout << endl; }",
    "isActive": true
  },
  {
    "text": "GCD of two number",
    "hint": "Use the Euclidean Algorithm: replace a with b and b with a % b until b is 0.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int a, b; cin >> a >> b; while (b != 0) { int temp = b; b = a % b; a = temp; } cout << a;",
    "isActive": true
  },
  {
    "text": "Check Armstrong Number",
    "hint": "Extract each digit using % 10, raise it to the number of digits, and add to sum. Compare with original.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int n, t, sum = 0, d = 0; cin >> n; t = n; while (t) { d++; t /= 10; } t = n; while (t) { sum += pow(t % 10, d); t /= 10; } cout << (sum == n ? 'Armstrong' : 'Not Armstrong');",
    "isActive": true
  },
  {
    "text": "Count the number of vowels in a string",
    "hint": "Convert uppercase to lowercase using ASCII (+32), then check against the 5 vowels.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int cnt=0; for(int i=0; str[i]; i++) { char c=str[i]; if(c>='A' && c<='Z') c+=32; if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cnt++; }",
    "isActive": true
  },
  {
    "text": "Find the second largest element in an array (without sorting).",
    "hint": "Track largest and second largest in one pass, shift m1 into m2 when a new max is found.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int m1=INT_MIN, m2=INT_MIN; for(int i=0; i<n; i++) { if(arr[i]>m1) { m2=m1; m1=arr[i]; } else if(arr[i]>m2 && arr[i]!=m1) m2=arr[i]; } printf('%d', m2);",
    "isActive": true
  },
  {
    "text": "Find the sum of even elements and the sum of odd elements of an array separately",
    "hint": "Use % 2 to check each element and add it to the matching sum.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int se=0, so=0; for(int i=0; i<n; i++) { if(arr[i]%2==0) se+=arr[i]; else so+=arr[i]; } printf('%d %d', se, so);",
    "isActive": true
  },
  {
    "text": "Linear search",
    "hint": "Start with pos = -1, update it on the first match, and break.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int pos=-1; for(int i=0; i<n; i++) { if(arr[i]==key) { pos=i; break; } } printf('%d', pos);",
    "isActive": true
  },
  {
    "text": "Check whether an array is sorted in ascending order",
    "hint": "If any element is greater than the next one, the array is not sorted.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int ok=1; for(int i=0; i<n-1; i++) { if(arr[i]>arr[i+1]) { ok=0; break; } } printf(ok ? 'Sorted' : 'Not sorted');",
    "isActive": true
  },
  {
    "text": "Bubble Sort Code",
    "hint": "Compare adjacent elements and swap them if they are in the wrong order.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "for (int i = 0; i < n-1; i++) for (int j = 0; j < n-i-1; j++) if (a[j] > a[j+1]) swap(a[j], a[j+1]);",
    "isActive": true
  },
  {
    "text": "Given an array, swap its first and last elements and print the updated array",
    "hint": "Use a temporary variable or the built-in swap() function.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "swap(a[0], a[n-1]); for (int i = 0; i < n; i++) cout << a[i] << ' ';",
    "isActive": true
  },
  {
    "text": "Code to Print Current Time",
    "hint": "Use time(0) to get current system time and ctime() to convert to readable format.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "time_t now = time(0); cout << ctime(&now);",
    "isActive": true
  },
  {
    "text": "Code to Print Current Date",
    "hint": "Use time(0), localtime(), and put_time() with '%d-%m-%Y'.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "time_t now = time(0); tm *t = localtime(&now); cout << put_time(t, '%d-%m-%Y');",
    "isActive": true
  },
  {
    "text": "Check overflow condition in stack",
    "hint": "Before inserting, check whether top == MAX - 1. If true, the stack is full.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (top == MAX - 1) cout << 'Stack Overflow'; else { top++; stack[top] = x; }",
    "isActive": true
  },
  {
    "text": "Check underflow condition in stack",
    "hint": "Before pop(), check whether top == -1. If true, the stack is empty.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (top == -1) cout << 'Stack Underflow'; else { cout << 'Popped: ' << stack[top]; top--; }",
    "isActive": true
  },
  {
    "text": "Implement the Push Operation in a Stack",
    "hint": "Check whether top == MAX - 1 before insertion. If not, stack[++top] = x.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (top == MAX - 1) cout << 'Stack Overflow'; else { stack[++top] = x; }",
    "isActive": true
  },
  {
    "text": "Implement the Pop Operation in a Stack",
    "hint": "Check whether top == -1. If not, return stack[top--].",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (top == -1) cout << 'Stack Underflow'; else { cout << stack[top]; top--; }",
    "isActive": true
  },
  {
    "text": "Implement the Enqueue Operation",
    "hint": "Check rear == MAX - 1. If empty, initialize front = 0, increment rear, and insert.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (rear == MAX - 1) cout << 'Queue Overflow'; else { if (front == -1) front = 0; queue[++rear] = x; }",
    "isActive": true
  },
  {
    "text": "Implement the Dequeue Operation",
    "hint": "Check front == -1 || front > rear. If not, display queue[front] and increment front.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "if (front == -1 || front > rear) cout << 'Queue Underflow'; else { cout << queue[front]; front++; }",
    "isActive": true
  },
  {
    "text": "Insert 10 Elements into an Array",
    "hint": "Use a for loop from 0 to 9 to input and display the elements.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int a[10]; for (int i = 0; i < 10; i++) cin >> a[i]; for (int i = 0; i < 10; i++) cout << a[i] << ' ';",
    "isActive": true
  },
  {
    "text": "Implement Inorder function Traversals in a Binary Tree",
    "hint": "Left -> Root -> Right",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "void inorder(Node* root) { if (!root) return; inorder(root->left); cout << root->data << ' '; inorder(root->right); }",
    "isActive": true
  },
  {
    "text": "Implement Preorder function Traversals in a Binary Tree",
    "hint": "Root -> Left -> Right",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "void preorder(Node* root) { if (!root) return; cout << root->data << ' '; preorder(root->left); preorder(root->right); }",
    "isActive": true
  },
  {
    "text": "Implement Postorder function Traversals in a Binary Tree",
    "hint": "Left -> Right -> Root",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "void postorder(Node* root) { if (!root) return; postorder(root->left); postorder(root->right); cout << root->data << ' '; }",
    "isActive": true
  },
  {
    "text": "Print Your Name and Event Name in C",
    "hint": "Use printf",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "printf('Name: \\n'); printf('Event: Venom 2.0');",
    "isActive": true
  },
  {
    "text": "Write a program to print all numbers from 1 to 100 using a loop.",
    "hint": "Use loop: for (int i = 1; i <= 100; i++) printf('%d ', i);",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "for (int i = 1; i <= 100; i++) printf('%d ', i);",
    "isActive": true
  },
  {
    "text": "Write a C program to print all uppercase English alphabets from A to Z using a loop.",
    "hint": "Use loop from 'A' to 'Z' and print using %c.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "for (char i = 'A'; i <= 'Z'; i++) printf('%c ', i);",
    "isActive": true
  },
  {
    "text": "Find the Factorial of a Number",
    "hint": "Recursive: return 1 when n is 0 or 1; otherwise, return n * factorial(n-1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int factorial(int n) { if (n <= 1) return 1; return n * factorial(n - 1); }",
    "isActive": true
  },
  {
    "text": "Fibonacci Series Using Recursion",
    "hint": "First two terms are 0 and 1. Return fib(n-1) + fib(n-2).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "int fib(int n) { if (n <= 1) return n; return fib(n - 1) + fib(n - 2); }",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 5;\n  printf(\"%d \", a++);\n  printf(\"%d\", a);\n  return 0;\n}\nWhat is the output?",
    "hint": "Post-increment uses current value first, then increments it.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "5 6",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 10;\n  if (x > 5)\n    if (x < 15)\n      printf(\"A\");\n    else\n      printf(\"B\");\n  return 0;\n}\nWhat is the output?",
    "hint": "Both conditions are true. Else belongs to the nearest unmatched if.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "A",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int i;\n  for (i = 1; i <= 5; i++);\n  printf(\"%d\", i);\n  return 0;\n}\nWhat is the output?",
    "hint": "Notice the semicolon immediately after the for loop header.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "6",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 10;\n  printf(\"%d\", x / 3 * 3);\n  return 0;\n}\nWhat is the output?",
    "hint": "Integer division: 10 / 3 = 3, then 3 * 3 = 9.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 0;\n  if (x = 5)\n    printf(\"True\");\n  else\n    printf(\"False\");\n  return 0;\n}\nWhat is the output?",
    "hint": "(=) assigns 5, which evaluates to non-zero (true).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "True",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 4;\n  printf(\"%d\", a << 1);\n  return 0;\n}\nWhat is the output?",
    "hint": "Left-shifting by one bit doubles positive integer.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 7;\n  printf(\"%d\", x > 5 && x < 10);\n  return 0;\n}\nWhat is the output?",
    "hint": "Logical operators return 1 for true and 0 for false in C.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 5;\n  int *p = &x;\n  *p = *p + 10;\n  printf(\"%d\", x);\n  return 0;\n}\nWhat is the output?",
    "hint": "Dereferencing a pointer modifies original variable.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "15",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int i = 5;\n  do {\n    printf(\"%d \", i);\n    i--;\n  } while (i > 2);\n  return 0;\n}\nWhat is the output?",
    "hint": "A do-while loop executes its body before checking condition.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "5 4 3 ",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = 5n + 10",
    "hint": "Ignore constants and lower-order terms.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nvoid fun(int n) {\n  if(n<=1) return;\n  fun(n/2);\n  fun(n/2);\n}",
    "hint": "Two recursive calls, each with half input: T(n) = 2T(n/2) + O(1) => O(n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i<=n; i++)\n  for(int j=1; j<=n; j+=i)\n    cout << j;",
    "hint": "Harmonic sum: n/1 + n/2 + n/3 + ... = n * ln(n) = O(n log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i*i<=n; i++)\n  for(int j=1; j*j<=n; j++)\n    cout << i+j;",
    "hint": "Both loops execute sqrt(n) times: sqrt(n) * sqrt(n) = n.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i<n; i*=3)\n  cout << i;",
    "hint": "Loop variable multiplies by 3: O(log_3 n) = O(log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n² + 2ⁿ + n!",
    "hint": "Factorial growth dominates exponential and polynomial.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n!)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = log(log n)",
    "hint": "Logarithm applied twice.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(log log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n(n + 1)/2",
    "hint": "(n^2 + n) / 2 = O(n^2).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n²)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n! + 2ⁿ",
    "hint": "Factorial grows faster than exponential.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(n!)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = √n + log n",
    "hint": "n^0.5 dominates log n.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "O(√n)",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display your name and the event name on a webpage",
    "hint": "Use <h1> and <h2> tags inside <body> section to display name and event.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to insert an image into a webpage.",
    "hint": "Use the <img> tag with src and alt.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to change the webpage background color to red",
    "hint": "Use style='background-color: red;' on body tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display a heading with a font size of 30px.",
    "hint": "Use style='font-size: 30px;' on heading tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display a heading in red color",
    "hint": "Use style='color: red;' on heading tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to create a link that redirects to IEEE CS Website",
    "hint": "Use <a href='https://cs.ieeemuj.com/'>Visit</a>.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to insert a horizontal line between two paragraph",
    "hint": "Use <hr> tag between two <p> tags.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to center-align a heading",
    "hint": "Use style='text-align: center;' on heading.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to change a paragraph's font family to Snap ITC",
    "hint": "Use style='font-family: Snap ITC;'.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to create a button with a red background and white text and write Venom 2.0 on it.",
    "hint": "Use <button style='background-color: red; color: white;'>Venom 2.0</button>.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Implement Binary Search on a sorted array of N elements to find a target key in O(log n) time.",
    "hint": "Maintain low = 0, high = n - 1. Compute mid = low + (high - low) / 2 and narrow the search half each step.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int low = 0, high = n - 1, ans = -1; while (low <= high) { int mid = low + (high - low) / 2; if (arr[mid] == key) { ans = mid; break; } else if (arr[mid] < key) low = mid + 1; else high = mid - 1; }",
    "isActive": true
  },
  {
    "text": "Write a function to reverse a Singly Linked List iteratively in O(n) time and O(1) auxiliary space.",
    "hint": "Use three pointers: prev = NULL, curr = head, and next = NULL. Rewire curr->next = prev in a loop.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "Node* reverse(Node* head) { Node *prev = NULL, *curr = head, *next = NULL; while (curr) { next = curr->next; curr->next = prev; prev = curr; curr = next; } return prev; }",
    "isActive": true
  },
  {
    "text": "Write a function to detect whether a Singly Linked List contains a cycle (loop) in O(n) time and O(1) space.",
    "hint": "Use Floyd's Cycle-Finding Algorithm: move slow pointer by 1 step and fast pointer by 2 steps.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "bool hasCycle(Node* head) { Node *slow = head, *fast = head; while (fast && fast->next) { slow = slow->next; fast = fast->next->next; if (slow == fast) return true; } return false; }",
    "isActive": true
  },
  {
    "text": "Kadane's Algorithm: Find the maximum sum of a contiguous subarray in an array (which may contain negative numbers) in O(n) time.",
    "hint": "Track currentSum and maxSum. Update currentSum = max(arr[i], currentSum + arr[i]) and maxSum = max(maxSum, currentSum).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int maxSum = arr[0], cur = arr[0]; for (int i = 1; i < n; i++) { cur = max(arr[i], cur + arr[i]); maxSum = max(maxSum, cur); } cout << maxSum;",
    "isActive": true
  },
  {
    "text": "Write a program/function to check if a string of brackets (), {}, [] is balanced using a Stack.",
    "hint": "Push opening brackets onto stack; on closing bracket, check if stack top matches the corresponding opening bracket.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "stack<char> st; for (char c : s) { if (c=='('||c=='{'||c=='[') st.push(c); else { if (st.empty()) return false; char t = st.top(); st.pop(); if ((c==')'&&t!='(')||(c=='}'&&t!='{')||(c==']'&&t!='[')) return false; } } return st.empty();",
    "isActive": true
  },
  {
    "text": "Merge two sorted arrays A (size n) and B (size m) into a single sorted array in O(n + m) time.",
    "hint": "Use two pointers i = 0 and j = 0, compare A[i] and B[j], and append the smaller element to the result array.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int i = 0, j = 0, k = 0; while (i < n && j < m) C[k++] = (A[i] <= B[j]) ? A[i++] : B[j++]; while (i < n) C[k++] = A[i++]; while (j < m) C[k++] = B[j++];",
    "isActive": true
  },
  {
    "text": "Rotate an array of N elements to the right by K positions in O(n) time and O(1) extra space.",
    "hint": "Set k = k % n. Reverse the entire array, then reverse the first k elements, then reverse the remaining n - k elements.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "k %= n; reverse(arr, arr + n); reverse(arr, arr + k); reverse(arr + k, arr + n);",
    "isActive": true
  },
  {
    "text": "Dutch National Flag Problem: Sort an array containing only 0s, 1s, and 2s in a single pass O(n) time and O(1) space.",
    "hint": "Maintain three pointers: low = 0, mid = 0, high = n - 1. Swap based on whether arr[mid] is 0, 1, or 2.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int low = 0, mid = 0, high = n - 1; while (mid <= high) { if (a[mid] == 0) swap(a[low++], a[mid++]); else if (a[mid] == 1) mid++; else swap(a[mid], a[high--]); }",
    "isActive": true
  },
  {
    "text": "Check whether two strings S1 and S2 are anagrams of each other in O(n) time using a frequency array.",
    "hint": "If lengths differ return false. Increment count[s1[i]] and decrement count[s2[i]], then verify all counts are 0.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int freq[256] = {0}; if (strlen(s1) != strlen(s2)) return false; for (int i = 0; s1[i]; i++) { freq[(unsigned char)s1[i]]++; freq[(unsigned char)s2[i]]--; } for (int i = 0; i < 256; i++) if (freq[i] != 0) return false; return true;",
    "isActive": true
  },
  {
    "text": "In an array where every element appears twice except for one element that appears once, find that single element in O(n) time and O(1) space.",
    "hint": "Use bitwise XOR (^): x ^ x = 0 and x ^ 0 = x. XOR all elements together.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int ans = 0; for (int i = 0; i < n; i++) ans ^= arr[i]; cout << ans;",
    "isActive": true
  },
  {
    "text": "Count the number of set bits (1s) in the binary representation of an integer N using Brian Kernighan's algorithm.",
    "hint": "Repeatedly do n = n & (n - 1) to clear the lowest set bit and increment a counter until n becomes 0.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int count = 0; while (n > 0) { n = n & (n - 1); count++; } cout << count;",
    "isActive": true
  },
  {
    "text": "Write a single bitwise expression (without loops) to check whether a positive integer N is a power of 2.",
    "hint": "A power of 2 has only one set bit, so n > 0 and (n & (n - 1)) == 0.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "bool isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);",
    "isActive": true
  },
  {
    "text": "Write a recursive function to find the Height (Maximum Depth) of a Binary Tree.",
    "hint": "Base case: if root is NULL return 0. Otherwise return 1 + max(height(root->left), height(root->right)).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int height(Node* root) { if (!root) return 0; return 1 + max(height(root->left), height(root->right)); }",
    "isActive": true
  },
  {
    "text": "Write a function to check whether a Binary Tree is a valid Binary Search Tree (BST).",
    "hint": "Pass (root, minVal, maxVal) recursively. Every node's value must strictly lie in (minVal, maxVal).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "bool isBST(Node* r, long minV, long maxV) { if (!r) return true; if (r->data <= minV || r->data >= maxV) return false; return isBST(r->left, minV, r->data) && isBST(r->right, r->data, maxV); }",
    "isActive": true
  },
  {
    "text": "Find the Lowest Common Ancestor (LCA) of two nodes P and Q in a Binary Search Tree (BST).",
    "hint": "If both p and q are smaller than root, go left; if both are larger, go right; otherwise root is the LCA.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "Node* lca(Node* root, int p, int q) { while (root) { if (p < root->data && q < root->data) root = root->left; else if (p > root->data && q > root->data) root = root->right; else return root; } return NULL; }",
    "isActive": true
  },
  {
    "text": "Find the Next Greater Element for every element in an array in O(n) time using a Stack.",
    "hint": "Traverse from right to left. Pop stack elements <= arr[i]. The stack top is the next greater element (or -1 if empty), then push arr[i].",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "stack<int> st; vector<int> nge(n); for (int i = n - 1; i >= 0; i--) { while (!st.empty() && st.top() <= arr[i]) st.pop(); nge[i] = st.empty() ? -1 : st.top(); st.push(arr[i]); }",
    "isActive": true
  },
  {
    "text": "Given a sorted array of N integers, find if there exists a pair of elements whose sum equals Target in O(n) time and O(1) space.",
    "hint": "Use the two-pointer technique: left = 0, right = n - 1. Move left++ if sum < target, right-- if sum > target.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int l = 0, r = n - 1; while (l < r) { int sum = arr[l] + arr[r]; if (sum == target) return true; else if (sum < target) l++; else r--; } return false;",
    "isActive": true
  },
  {
    "text": "Trapping Rain Water: Given an array height[] of N non-negative integers, compute the total water trapped after raining in O(n) time.",
    "hint": "Use two pointers (l, r) with leftMax and rightMax, or precompute prefixMax and suffixMax arrays.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int l = 0, r = n - 1, lMax = 0, rMax = 0, water = 0; while (l < r) { if (h[l] < h[r]) { lMax = max(lMax, h[l]); water += lMax - h[l++]; } else { rMax = max(rMax, h[r]); water += rMax - h[r--]; } }",
    "isActive": true
  },
  {
    "text": "Implement the Sieve of Eratosthenes to mark all prime numbers from 2 to N in O(n log log n) time.",
    "hint": "Create a boolean array isPrime[0..n] initialized to true. For i = 2 to i*i <= n, if isPrime[i], mark all multiples j = i*i to n step i as false.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "vector<bool> prime(n + 1, true); prime[0] = prime[1] = false; for (int i = 2; i * i <= n; i++) if (prime[i]) for (int j = i * i; j <= n; j += i) prime[j] = false;",
    "isActive": true
  },
  {
    "text": "Dynamic Programming (Climbing Stairs): Find the number of distinct ways to reach the Nth stair if you can take 1 or 2 steps at a time, in O(n) time and O(1) space.",
    "hint": "ways(n) = ways(n-1) + ways(n-2). Use two variables prev2 = 1, prev1 = 1 and iterate from 2 to n.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int prev2 = 1, prev1 = 1; for (int i = 2; i <= n; i++) { int cur = prev1 + prev2; prev2 = prev1; prev1 = cur; } cout << prev1;",
    "isActive": true
  },
  {
    "text": "Transpose an N x N matrix in-place without using an extra matrix.",
    "hint": "Swap mat[i][j] with mat[j][i] only for the upper triangle (j = i + 1 to n - 1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) swap(mat[i][j], mat[j][i]);",
    "isActive": true
  },
  {
    "text": "Rotate an N x N matrix by 90 degrees clockwise in-place.",
    "hint": "Step 1: Transpose the matrix in-place (swap mat[i][j] and mat[j][i]). Step 2: Reverse each row.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) swap(mat[i][j], mat[j][i]); for (int i = 0; i < n; i++) reverse(mat[i], mat[i] + n);",
    "isActive": true
  },
  {
    "text": "Find the middle node of a Singly Linked List in a single pass.",
    "hint": "Use slow and fast pointers initialized to head. Advance slow by 1 node and fast by 2 nodes until fast reaches the end.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "Node* middleNode(Node* head) { Node *slow = head, *fast = head; while (fast && fast->next) { slow = slow->next; fast = fast->next->next; } return slow; }",
    "isActive": true
  },
  {
    "text": "Implement the Enqueue operation in a Circular Queue of capacity MAX.",
    "hint": "Full condition is (rear + 1) % MAX == front. Otherwise update rear = (rear + 1) % MAX and insert.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if ((rear + 1) % MAX == front) cout << 'Circular Queue Full'; else { if (front == -1) front = 0; rear = (rear + 1) % MAX; cq[rear] = x; }",
    "isActive": true
  },
  {
    "text": "Binary Exponentiation: Write an iterative or recursive function to compute (a^b) % MOD in O(log b) time.",
    "hint": "Square the base and halve the exponent b >>= 1 each step; multiply into result whenever (b & 1) is odd.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "long long power(long long a, long long b, long long mod) { long long res = 1; a %= mod; while (b > 0) { if (b & 1) res = (res * a) % mod; a = (a * a) % mod; b >>= 1; } return res; }",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int arr[] = {10, 20, 30, 40};\n  int *p = arr;\n  printf(\"%d \", *p++);\n  printf(\"%d \", ++*p);\n  printf(\"%d\", *++p);\n  return 0;\n}\nWhat is the exact output?",
    "hint": "*p++ prints arr[0] (10) and moves p to arr[1]; ++*p increments arr[1] to 21 and prints 21; *++p moves p to arr[2] and prints 30.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "10 21 30",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint fun(int n) {\n  static int x = 0;\n  if (n > 0) {\n    x++;\n    return fun(n - 1) + x;\n  }\n  return 0;\n}\nint main() {\n  printf(\"%d\", fun(5));\n  return 0;\n}\nWhat is the output?",
    "hint": "x is static, so it is incremented 5 times to 5 before any addition happens on unwinding: 5 + 5 + 5 + 5 + 5 = 25.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "25",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 1, b = 1, c = 1;\n  int d = ++a || ++b && ++c;\n  printf(\"%d %d %d %d\", a, b, c, d);\n  return 0;\n}\nWhat is the output?",
    "hint": "&& has higher precedence than ||, so it groups as (++a) || (++b && ++c). Since ++a is 2 (true), short-circuit evaluation skips (++b && ++c)!",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "2 1 1 1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 5, b = 3;\n  printf(\"%d\", a & b == 3);\n  return 0;\n}\nWhat is the output?",
    "hint": "Relational == has higher precedence than bitwise &. So (b == 3) evaluates to 1 first, then 5 & 1 = 1.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nvoid trace(int n) {\n  if (n <= 0) return;\n  printf(\"%d \", n);\n  trace(n - 1);\n  printf(\"%d \", n);\n}\nint main() {\n  trace(3);\n  return 0;\n}\nWhat is the output?",
    "hint": "Prints n on the way down (3 2 1) and again on the way back up as stack frames unwind (1 2 3).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "3 2 1 1 2 3",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint f(int n) {\n  if (n <= 1) return 1;\n  return f(n - 1) + f(n - 2);\n}\nint main() {\n  printf(\"%d\", f(5));\n  return 0;\n}\nWhat is the output?",
    "hint": "f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=8.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  char s[] = \"GATE2026\";\n  char *p = s;\n  printf(\"%s\", p + p[3] - p[1]);\n  return 0;\n}\nWhat is the output?",
    "hint": "p[3] is 'E' (69) and p[1] is 'A' (65). 'E' - 'A' = 4. So p + 4 points to \"2026\".",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "2026",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int i = 5;\n  int sz = sizeof(++i);\n  printf(\"%d\", i);\n  return 0;\n}\nWhat is the output?",
    "hint": "Expressions inside sizeof() are evaluated at compile time for their type only; side effects (++i) do not execute at runtime.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "5",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a, b;\n  a = (10, 20, 30);\n  b = 10, 20, 30;\n  printf(\"%d %d\", a, b);\n  return 0;\n}\nWhat is the output?",
    "hint": "Parentheses force comma operator in a (evaluates to last value 30). Assignment = has higher precedence than comma in b, so b gets 10.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "30 10",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\n#define SQR(x) x * x\nint main() {\n  printf(\"%d\", SQR(3 + 2));\n  return 0;\n}\nWhat is the output?",
    "hint": "Macros perform textual substitution without parentheses: 3 + 2 * 3 + 2 = 3 + 6 + 2 = 11.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "11",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a[2][3] = {{1, 2, 3}, {4, 5, 6}};\n  printf(\"%d\", *(*(a + 1) + 2));\n  return 0;\n}\nWhat is the output?",
    "hint": "*(*(a + 1) + 2) is equivalent to a[1][2].",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "6",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nvoid mystery(int *p, int *q) {\n  p = q;\n  *p = 100;\n}\nint main() {\n  int a = 10, b = 20;\n  mystery(&a, &b);\n  printf(\"%d %d\", a, b);\n  return 0;\n}\nWhat is the output?",
    "hint": "p is reassigned to point to b (same as q), and *p = 100 modifies b to 100 while leaving a unchanged at 10.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "10 100",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  unsigned int x = 1;\n  printf(\"%u\", (x << 4) ^ (x << 2));\n  return 0;\n}\nWhat is the output?",
    "hint": "1 << 4 is 16 (10000 in binary) and 1 << 2 is 4 (00100 in binary). 16 ^ 4 = 20.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "20",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 012;\n  printf(\"%d\", x + 5);\n  return 0;\n}\nWhat is the output?",
    "hint": "A leading 0 in C denotes an octal literal! 012 in octal is 1*8 + 2 = 10 in decimal. 10 + 5 = 15.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "15",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int arr[5] = {10, 20, 30, 40, 50};\n  int *p = &arr[1];\n  int *q = &arr[4];\n  printf(\"%ld\", q - p);\n  return 0;\n}\nWhat is the output?",
    "hint": "Subtracting two pointers to the same array gives the number of elements between them (4 - 1 = 3), not the byte difference.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "3",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 0;\n  printf(\"%d %d\", !a, ~a);\n  return 0;\n}\nWhat is the output?",
    "hint": "!0 is logical NOT (1). ~0 is bitwise NOT (all bits 1, which represents -1 in 2's complement).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "1 -1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int n = 29, cnt = 0;\n  while (n) {\n    n &= (n - 1);\n    cnt++;\n  }\n  printf(\"%d\", cnt);\n  return 0;\n}\nWhat is the output?",
    "hint": "The loop counts the number of set bits in 29. Since 29 = 16 + 8 + 4 + 1 = 11101 in binary, it has 4 set bits.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "4",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  char *p[] = {\"IEEE\", \"VENOM\", \"MUJ\"};\n  printf(\"%c\", *(*(p + 1) + 2));\n  return 0;\n}\nWhat is the output?",
    "hint": "*(p + 1) is \"VENOM\", and *(*(p + 1) + 2) is index 2 of \"VENOM\", which is 'N'.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "N",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 4; i++) {\n    switch (i) {\n      case 1: sum += 1;\n      case 2: sum += 2; break;\n      case 3: sum += 3;\n      default: sum += 4;\n    }\n  }\n  printf(\"%d\", sum);\n  return 0;\n}\nWhat is the output?",
    "hint": "Watch fall-through where break is missing! i=1 adds 1+2=3; i=2 adds 2; i=3 adds 3+4=7; i=4 adds 4. Total = 3+2+7+4 = 16.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "16",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint f(int n) {\n  if (n <= 1) return n;\n  if (n % 2 == 0) return n + f(n / 2);\n  return f((n + 1) / 2) + f((n - 1) / 2);\n}\nint main() {\n  printf(\"%d\", f(7));\n  return 0;\n}\nWhat is the output?",
    "hint": "f(7) = f(4) + f(3); f(4) = 4 + f(2) = 4 + 2 + f(1) = 7; f(3) = f(2) + f(1) = 3 + 1 = 4. Total = 7 + 4 = 11.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "11",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a[] = {2, 4, 6, 8, 10};\n  int *p = a + 2;\n  printf(\"%d %d\", p[-1], p[1]);\n  return 0;\n}\nWhat is the output?",
    "hint": "p points to a[2] (6). p[-1] is *(p - 1) = a[1] = 4, and p[1] is *(p + 1) = a[3] = 8.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "4 8",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 3, y = 4, z = 5;\n  printf(\"%d\", x < y < z);\n  return 0;\n}\nWhat is the output?",
    "hint": "< associates left-to-right: (3 < 4) evaluates to 1, and then (1 < 5) evaluates to 1.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 10, y = 5, z = 3;\n  printf(\"%d\", x > y > z);\n  return 0;\n}\nWhat is the output?",
    "hint": "> associates left-to-right: (10 > 5) evaluates to 1, and then (1 > 3) evaluates to 0!",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "0",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nvoid fun(int **pp) {\n  static int val = 99;\n  *pp = &val;\n}\nint main() {\n  int a = 10;\n  int *p = &a;\n  fun(&p);\n  printf(\"%d\", *p);\n  return 0;\n}\nWhat is the output?",
    "hint": "Double pointer pp modifies p itself in main() to point to static variable val (99).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "99",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint countCalls(int n) {\n  if (n <= 1) return 1;\n  return 1 + 2 * countCalls(n - 1);\n}\nint main() {\n  printf(\"%d\", countCalls(4));\n  return 0;\n}\nWhat is the output?",
    "hint": "countCalls(1)=1, countCalls(2)=3, countCalls(3)=7, countCalls(4)=15 (2^n - 1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "15",
    "isActive": true
  },
  {
    "text": "Find the time complexity of the recurrence relation: T(n) = 4T(n/2) + n²",
    "hint": "By Master Theorem: a = 4, b = 2, n^(log_b a) = n^2. Since f(n) = n^2 matches Case 2, T(n) = O(n² log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n² log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of the recurrence relation: T(n) = 2T(n/2) + n",
    "hint": "Merge Sort recurrence! By Master Theorem (a=2, b=2, f(n)=n), T(n) = O(n log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n log n)",
    "isActive": true
  },
  {
    "text": "Find the tight time complexity of:\nfor (int i = 1; i < n; i *= 2)\n  for (int j = 0; j < i; j++)\n    sum++;",
    "hint": "The inner loop runs 1 + 2 + 4 + 8 + ... + n times, which is a geometric series summing to 2n - 1 = O(n), NOT O(n log n)!",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of the recurrence: T(n) = T(n - 1) + T(n - 2) + O(1)",
    "hint": "This is the naive recursive Fibonacci recurrence, which grows exponentially.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(2^n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nvoid solve(int n) {\n  if (n <= 2) return;\n  solve(sqrt(n));\n}",
    "hint": "Substitute n = 2^m; each call halves m (2^(m/2)), taking O(log m) = O(log log n) steps.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(log log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor (int i = 1; i <= n; i++)\n  for (int j = 1; j <= i * i; j++)\n    for (int k = 1; k <= n / 2; k++)\n      cnt++;",
    "hint": "For each i, middle loop runs i^2 times and inner runs n/2 times. Sum of i^2 from 1 to n is O(n^3); multiplied by n/2 gives O(n^4).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n^4)",
    "isActive": true
  },
  {
    "text": "What is the tightest time complexity of building a Binary Max-Heap from an unsorted array of N elements using the bottom-up heapify approach?",
    "hint": "Most nodes are near the bottom of the tree and travel very few levels; the sum of heights is linear.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of the recurrence: T(n) = T(n / 2) + O(1)",
    "hint": "Binary Search recurrence: problem size halves at each step with constant work.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor (int i = n; i >= 1; i /= 2)\n  for (int j = 1; j <= n; j++)\n    cnt++;",
    "hint": "Outer loop executes log_2(n) times, and inner loop executes n times independently on each iteration.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of the recurrence: T(n) = T(n - 1) + n",
    "hint": "Unrolling gives n + (n - 1) + (n - 2) + ... + 1 = n(n + 1)/2.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n²)",
    "isActive": true
  },
  {
    "text": "Bhai Ka Breakup: Act out a dramatic breakup scene while doing 10 jumping jacks.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Gym Influencer: 20 sec fake fitness-influencer intro → 10 fake curls with an imaginary dumbbell → flex for 10 sec.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Sigma Walk™: Perform the most unnecessarily serious slow-motion walk possible → immediately transition into 10 jumping jacks.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Breaking News: Deliver a breaking-news report about why you are late to class while continuously doing side steps.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Gym Bro Transformation: Normal person → sees mirror → suddenly becomes gym bro → flexes every muscle → collapses dramatically.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Snake Charmer: Perform a snake-charmer routine for 45 sec while avoiding an imaginary snake that keeps attacking you.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Aunty at Shaadi: 30 sec imaginary shaadi dance + 10 squats + dramatic 'HAAYE RABBA!'",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "NPC Gone Wrong: Walk across the room like an NPC → suddenly glitch → moonwalk backwards → freeze.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Helicopter Helicopter: Spin arms like a helicopter while walking to the marker and back without crashing.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Cricket Umpire Simulator: Give 5 different exaggerated umpire signals, then run an imaginary single.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Desi Robot: Robot dance for 30 sec, but every 5 sec judge shouts a new body part that must 'malfunction'.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Pigeon Attack: Walk normally until judge says 'PIGEON!' → immediately react dramatically and run away. Repeat 5 times.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Barber Emergency: Pretend you're cutting someone's hair, discover something horrifying, panic, fix it, then pose like a professional barber.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Lagging Human: Walk normally → 5-sec lag → teleport → freeze → reboot → continue. Repeat 4 times.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Moye Moye Fitness: Do 10 squats while dramatically acting like your life has completely fallen apart.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Bhangra Emergency: 30 sec maximum-energy bhangra → sudden freeze → 5 squats → continue bhangra.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "CCTV Footage: Act like you're being watched by CCTV and desperately trying to look innocent for 45 sec.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Airplane Mode: Pretend to be an airplane taking off, flying through turbulence and landing safely. Add 10 jumping jacks during turbulence.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Exam Panic: Act out opening an exam paper and realizing you studied the wrong subject. Add 5 panic squats.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Reel Loading: Begin a dramatic reel → freeze halfway like the video is buffering → suddenly resume at 2x speed.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Wrong Wedding: Enter confidently as if you know everyone at a wedding → realize it is the wrong wedding → leave dramatically.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Traffic Police Boss: Direct imaginary traffic with increasingly dramatic hand signals while doing 5 squats whenever a 'vehicle' disobeys.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Mosquito Fight: Fight one imaginary mosquito that keeps escaping. End by dramatically celebrating the victory.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Ghost Behind You: Walk confidently while judge quietly says 'ghost'. React without looking back, then slowly lose your mind.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Chai Emergency: Pretend you desperately need chai. Search everywhere, find an imaginary cup and celebrate like you won a trophy.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Fridge Investigation: Open an imaginary fridge repeatedly and react differently each time because there is 'nothing to eat'.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Monday Morning: Act out waking up on Monday → realizing you have class → attempting to get ready → dramatic surrender.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Attendance Crisis: Act like you are one attendance percentage short. Beg an imaginary professor while doing 5 squats.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Group Project: Act as four different group-project members: leader, ghoster, confused member and last-minute worker.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Placement Interview: Enter an imaginary interview → answer ridiculous questions → panic → give an overconfident final pose.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Gym Mirror Interview: Interview yourself in the gym mirror about your 'massive gains', then demonstrate 5 ridiculous imaginary exercises.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Protein Shake Disaster: Pretend to make a protein shake → shake it → discover it exploded → clean everything dramatically.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Personal Trainer Gone Mad: Coach an imaginary person through 5 increasingly ridiculous but safe exercises.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Slow-Mo Fight: Perform a completely imaginary slow-motion action fight against an invisible opponent. No contact.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Action Hero Reload: Do an exaggerated action-hero entrance → imaginary reload → dodge → victory pose.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Mission Impossible: Cross the room as if invisible lasers are everywhere. Avoid them with ridiculous but safe movements.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Autocorrect Fail: Pretend you are sending a message, autocorrect keeps changing it, and act out the increasingly disastrous consequences.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Phone at 1%: Search desperately for an imaginary charger, dodge imaginary obstacles and finally discover it was in your hand.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Instagram Model: Pose for 5 imaginary photos, each more ridiculous than the previous one, then do a dramatic runway walk.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Runway Disaster: Perform a serious fashion runway walk → safely recover from an imaginary stumble → continue like nothing happened.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Fashion Police: Inspect an imaginary person's outfit like a fashion critic and dramatically reject every item.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Barber Customer: Act as a customer receiving the worst imaginary haircut ever, then reveal the 'masterpiece'.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Waiter Mode: Serve an imaginary table while dealing with increasingly ridiculous customer requests.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Food Blogger: Review an imaginary dish with absurd seriousness. Include smell test, taste test and final rating.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Street Interview: Interview an imaginary celebrity about the most ridiculous topic possible while doing side steps.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Reporter Under Attack: Deliver breaking news while imaginary chaos happens behind you. Never break character.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Weather Reporter: Give a live weather report while physically acting out every weather condition you announce.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Zombie Gym: Act like a zombie trying to complete 5 squats, then suddenly become normal and celebrate.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Superhero Landing: Perform 3 different exaggerated superhero landing poses while staying upright, then deliver a victory speech.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Superhero Failure: Attempt to be a superhero but every imaginary power fails. End with a dramatic normal-person walk away.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Villain Monologue: Deliver an absurd villain speech while slowly pacing and performing 5 dramatic villain poses.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Final Boss Laugh: Give the most ridiculous villain laugh you can → recover → try an even more dramatic one → victory pose.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Invisible Dog: Walk an imaginary dog that refuses to cooperate. Chase it, negotiate with it and finally pose with it.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Catwalk Cat: Perform a fashion catwalk while acting like an extremely arrogant cat.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Monkey Business: Act like a monkey discovering an imaginary object for the first time, then become terrified of it.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Penguin President: Walk like a penguin while giving a serious presidential speech about penguin problems.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Chicken Minister: Give a serious speech while acting like a chicken whenever the judge says 'EGG'.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Viral Reel Gone Wrong: Start a normal reel → judge changes the required style every 10 sec → finish with an unexpected dramatic pose.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Venom Challenge: 10 jumping jacks → 5 squats → 10-sec villain pose → finish with your best Venom-style victory celebration.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Group Photo Disaster: Set up an imaginary group photo, but every time the judge says 'PHOTO,' strike a completely different ridiculous pose.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Restaurant Complaint: Pretend your imaginary food order is completely wrong and give the most dramatic complaint possible.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "Venom Victory: Do 5 jumping jacks → 3 squats → 2 dramatic poses → 1 completely ridiculous final victory celebration.",
    "hint": "Perform this physical challenge in front of the room coordinator / admin.",
    "type": "PHYSICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "Completed",
    "isActive": true
  },
  {
    "text": "What decimal value does the 8-bit two's-complement number 11101101 represent?",
    "hint": "Category: Bitwise / 2's Complement. Solve step-by-step and write the exact signed integer value.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "-19",
    "isActive": true
  },
  {
    "text": "Convert (243)₅ into decimal.",
    "hint": "Category: Number Systems. Multiply digits by powers of 5 and sum them up.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "73",
    "isActive": true
  },
  {
    "text": "Convert (2B)₁₂ into decimal, where A = 10 and B = 11.",
    "hint": "Category: Number Systems. Multiply digits by powers of 12 and sum them up.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "35",
    "isActive": true
  },
  {
    "text": "Perform a 2-bit circular left rotation on 10010110.",
    "hint": "Category: Bitwise Operations. Move the 2 most significant bits to the least significant positions.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "01011010",
    "isActive": true
  },
  {
    "text": "Find the final value of n: int n=5; for(int i=1;i<=n;i++) n-=i;",
    "hint": "Category: Loops & Tracing. Trace the loop iteration-by-iteration carefully checking the loop condition.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "2",
    "isActive": true
  },
  {
    "text": "Find the output: int sum=0; for(int i=1;i<=10;i++){ if(i%3==0) continue; sum+=i; } System.out.println(sum);",
    "hint": "Category: Loops & Control Flow. Sum numbers from 1 to 10 that are not multiples of 3.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "37",
    "isActive": true
  },
  {
    "text": "Find the final value of x: int x=2; for(int i=0;i<4;i++) x=x*2-i;",
    "hint": "Category: Loops & Expressions. Trace step-by-step for i = 0, 1, 2, 3.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "21",
    "isActive": true
  },
  {
    "text": "Find the smallest 3-digit number divisible by both 7 and 9.",
    "hint": "Category: Number Theory. Find LCM(7, 9) and the first 3-digit multiple.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "126",
    "isActive": true
  },
  {
    "text": "Find the largest 4-digit number divisible by both 12 and 15.",
    "hint": "Category: Number Theory. Find LCM(12, 15) and calculate largest multiple <= 9999.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9960",
    "isActive": true
  },
  {
    "text": "How many integers from 1 to 100 are divisible by neither 2 nor 3?",
    "hint": "Category: Combinatorics / Inclusion-Exclusion. Total - Divisible by 2 - Divisible by 3 + Divisible by 6.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "33",
    "isActive": true
  },
  {
    "text": "Perform binary addition: (1011)₂+(1101)₂",
    "hint": "Category: Binary Arithmetic. Add the two binary numbers directly or convert to decimal and back.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "11000",
    "isActive": true
  },
  {
    "text": "Find the loop count: for(i = 0; i < 20; i++).",
    "hint": "Category: Loop Execution Count. How many times will this loop iterate from 0 to 19?",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "20",
    "isActive": true
  },
  {
    "text": "Evaluate 1<<5",
    "hint": "Category: Bitwise Shift. Left-shifting 1 by 5 positions equals 2⁵.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "32",
    "isActive": true
  },
  {
    "text": "Find the decimal value of (10101010)2",
    "hint": "Category: Binary to Decimal. Sum powers of 2 for each set bit: 128 + 32 + 8 + 2.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "170",
    "isActive": true
  },
  {
    "text": "Find the loop count: for(i = 1; i <= 500; i *= 2).",
    "hint": "Category: Loop Complexity. Count powers of 2 starting at 1 up to 500 (1, 2, 4, ..., 256).",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9",
    "isActive": true
  },
  {
    "text": "Find the 2's complement of (10110101)2 using 8 bits and give its decimal value.",
    "hint": "Category: 2's Complement. Invert bits of 10110101 to get 01001010, add 1 = 01001011 = 75 in decimal.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "75",
    "isActive": true
  },
  {
    "text": "Which is larger: (203)4 or (123)5?",
    "hint": "Category: Base Comparison. Convert (203)₄ = 35 and (123)₅ = 38 to decimal.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "(123)5",
    "isActive": true
  },
  {
    "text": "Shift (101101)₂ left by 2 positions. Find the result in binary and decimal.",
    "hint": "Category: Bitwise Shift. 10110100₂ in binary equals 180 in decimal.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "180",
    "isActive": true
  },
  {
    "text": "An array has 2,000 elements. If 3 operations are performed for each element, how many operations are performed in total?",
    "hint": "Category: Algorithmic Operations. Multiply total elements by operations per element.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "6000",
    "isActive": true
  },
  {
    "text": "An integer array contains 50 elements, with each integer occupying 4 bytes. How many bytes of memory does the array require?",
    "hint": "Category: Memory Allocation. Multiply 50 elements by 4 bytes per element.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "200",
    "isActive": true
  },
  {
    "text": "What is 25% of 240?",
    "hint": "Aptitude (Easy): Calculate 25% (one quarter) of 240.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "40",
      "50",
      "60",
      "70"
    ],
    "correctAnswer": "60",
    "isActive": true
  },
  {
    "text": "A product costs ₹800 and is sold for ₹920. What is the profit percentage?",
    "hint": "Aptitude (Easy): Profit = ₹120 on cost price ₹800.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "10%",
      "12%",
      "15%",
      "20%"
    ],
    "correctAnswer": "15%",
    "isActive": true
  },
  {
    "text": "If 3x + 6 = 21, what is the value of x?",
    "hint": "Aptitude (Easy): Solve 3x = 21 - 6.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "3",
      "5",
      "7",
      "9"
    ],
    "correctAnswer": "5",
    "isActive": true
  },
  {
    "text": "What is the average of 12, 18, 20 and 30?",
    "hint": "Aptitude (Easy): Sum all 4 numbers and divide by 4.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "18",
      "20",
      "22",
      "24"
    ],
    "correctAnswer": "20",
    "isActive": true
  },
  {
    "text": "A train travels 240 km in 4 hours. What is its average speed?",
    "hint": "Aptitude (Easy): Speed = Distance / Time.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "50 km/h",
      "60 km/h",
      "70 km/h",
      "80 km/h"
    ],
    "correctAnswer": "60 km/h",
    "isActive": true
  },
  {
    "text": "What is the value of 15² - 10²?",
    "hint": "Aptitude (Easy): Calculate 225 - 100.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "100",
      "125",
      "150",
      "175"
    ],
    "correctAnswer": "125",
    "isActive": true
  },
  {
    "text": "What is the LCM of 8 and 12?",
    "hint": "Aptitude (Easy): Find the least common multiple of 8 and 12.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "16",
      "20",
      "24",
      "32"
    ],
    "correctAnswer": "24",
    "isActive": true
  },
  {
    "text": "A number is increased by 20% and becomes 120. What was the original number?",
    "hint": "Aptitude (Easy): Original * 1.20 = 120.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "90",
      "100",
      "110",
      "115"
    ],
    "correctAnswer": "100",
    "isActive": true
  },
  {
    "text": "What is the probability of getting a head when a fair coin is tossed once?",
    "hint": "Aptitude (Easy): Single coin toss has 2 equally likely outcomes.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "1/4",
      "1/3",
      "1/2",
      "1"
    ],
    "correctAnswer": "1/2",
    "isActive": true
  },
  {
    "text": "What is the next number in the sequence 2, 4, 8, 16, ?",
    "hint": "Aptitude (Easy): Each number is doubled (powers of 2).",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "24",
      "28",
      "30",
      "32"
    ],
    "correctAnswer": "32",
    "isActive": true
  },
  {
    "text": "A number is increased by 20% and then decreased by 10%. What is the net percentage change?",
    "hint": "Aptitude (Medium): Let value = 100 -> 120 -> 108 (+8%).",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "8% increase",
      "10% increase",
      "8% decrease",
      "2% increase"
    ],
    "correctAnswer": "8% increase",
    "isActive": true
  },
  {
    "text": "A product marked at ₹2,500 is sold after successive discounts of 20% and 10%. What is the selling price?",
    "hint": "Aptitude (Medium): ₹2,500 * 0.80 * 0.90.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "₹1,750",
      "₹1,800",
      "₹1,850",
      "₹2,000"
    ],
    "correctAnswer": "₹1,800",
    "isActive": true
  },
  {
    "text": "The ratio of A:B is 3:5 and B:C is 10:7. What is A:C?",
    "hint": "Aptitude (Medium): Multiply the ratios (3/5) * (10/7) = 6/7.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "3:7",
      "6:7",
      "7:6",
      "5:7"
    ],
    "correctAnswer": "6:7",
    "isActive": true
  },
  {
    "text": "The average of 8 numbers is 25. If one number, 39, is removed, what is the new average?",
    "hint": "Aptitude (Medium): Sum = 200. Remaining sum = 200 - 39 = 161. Divide by 7.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "22",
      "23",
      "24",
      "25"
    ],
    "correctAnswer": "23",
    "isActive": true
  },
  {
    "text": "A train 180 m long crosses a platform 270 m long in 18 seconds. What is the speed of the train?",
    "hint": "Aptitude (Medium): Total distance = 450 m. Speed = 450 / 18 = 25 m/s = 90 km/h.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "72 km/h",
      "80 km/h",
      "90 km/h",
      "100 km/h"
    ],
    "correctAnswer": "90 km/h",
    "isActive": true
  },
  {
    "text": "A and B can complete a job in 12 and 18 days respectively. How many days will they take together?",
    "hint": "Aptitude (Medium): Combined daily work rate = 1/12 + 1/18 = 5/36.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "6 days",
      "7.2 days",
      "8 days",
      "9 days"
    ],
    "correctAnswer": "7.2 days",
    "isActive": true
  },
  {
    "text": "A sum amounts to ₹1,440 in 2 years at 20% simple interest per annum. What is the principal?",
    "hint": "Aptitude (Medium): Select the principal that amounts to ₹1,440 (Option C).",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "₹1,000",
      "₹1,100",
      "₹1,200",
      "₹1,250"
    ],
    "correctAnswer": "₹1,200",
    "isActive": true
  },
  {
    "text": "A bag contains 6 red, 5 blue and 4 green balls. What is the probability of drawing a blue ball?",
    "hint": "Aptitude (Medium): Total balls = 15. Blue balls = 5. P = 5/15.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "1/5",
      "1/3",
      "2/5",
      "1/2"
    ],
    "correctAnswer": "1/3",
    "isActive": true
  },
  {
    "text": "How many different 3-digit numbers can be formed using 1, 2, 3, 4 and 5 without repetition?",
    "hint": "Aptitude (Medium): Permutation 5P3 = 5 * 4 * 3.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "40",
      "50",
      "60",
      "75"
    ],
    "correctAnswer": "60",
    "isActive": true
  },
  {
    "text": "The perimeter of a rectangle is 84 cm. Its length is 6 cm more than its width. What is its area?",
    "hint": "Aptitude (Medium): 2(L+W) = 84 => L+W = 42. L = 24, W = 18. Area = 24 * 18.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "396 cm²",
      "414 cm²",
      "432 cm²",
      "450 cm²"
    ],
    "correctAnswer": "432 cm²",
    "isActive": true
  },
  {
    "text": "A cyclist increases speed from 12 km/h to 15 km/h and takes 20 minutes less to cover the same distance. What is the distance?",
    "hint": "Aptitude (Hard): d/12 - d/15 = 20/60 hours.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "15 km",
      "18 km",
      "20 km",
      "24 km"
    ],
    "correctAnswer": "20 km",
    "isActive": true
  },
  {
    "text": "A boat travels 24 km downstream in 2 hours and the same distance upstream in 3 hours. What is the speed of the stream?",
    "hint": "Aptitude (Hard): Downstream = 12 km/h, Upstream = 8 km/h. Stream speed = (12 - 8) / 2.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "1 km/h",
      "2 km/h",
      "3 km/h",
      "4 km/h"
    ],
    "correctAnswer": "2 km/h",
    "isActive": true
  },
  {
    "text": "A pipe fills a tank in 6 hours while a drain empties it in 9 hours. If both are opened together, how long will the tank take to fill?",
    "hint": "Aptitude (Hard): Net filling rate = 1/6 - 1/9 = 1/18 per hour.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "12 hours",
      "15 hours",
      "18 hours",
      "24 hours"
    ],
    "correctAnswer": "18 hours",
    "isActive": true
  },
  {
    "text": "An amount becomes ₹1,331 in 3 years at 10% compound interest annually. What was the principal?",
    "hint": "Aptitude (Hard): P * (1.1)³ = 1331.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "₹900",
      "₹1,000",
      "₹1,100",
      "₹1,210"
    ],
    "correctAnswer": "₹1,000",
    "isActive": true
  },
  {
    "text": "A mixture contains milk and water in the ratio 5:2. If 14 liters of water are added, the ratio becomes 5:3. What was the original quantity of milk?",
    "hint": "Aptitude (Hard): Let milk = 5x, water = 2x. 5x / (2x + 14) = 5/3.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "60 L",
      "70 L",
      "80 L",
      "90 L"
    ],
    "correctAnswer": "70 L",
    "isActive": true
  },
  {
    "text": "A man travels 1/3 of a journey at 30 km/h and the remaining 2/3 at 60 km/h. What is his average speed for the whole journey?",
    "hint": "Aptitude (Hard): Average speed = Total Distance / Total Time.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "40 km/h",
      "45 km/h",
      "48 km/h",
      "50 km/h"
    ],
    "correctAnswer": "40 km/h",
    "isActive": true
  },
  {
    "text": "A class has an average height of 160 cm. A student of height 180 cm joins, raising the average to 160.95 cm. How many students were originally in the class?",
    "hint": "Aptitude (Hard): (160n + 180)/(n + 1) = 160.95.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "18",
      "20",
      "21",
      "22"
    ],
    "correctAnswer": "21",
    "isActive": true
  },
  {
    "text": "A two-digit number has digits whose sum is 11. Reversing the digits increases the number by 27. What is the original number?",
    "hint": "Aptitude (Hard): Digits sum to 11 and differ by 3.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "47",
      "56",
      "65",
      "74"
    ],
    "correctAnswer": "74",
    "isActive": true
  },
  {
    "text": "A father is 4 times as old as his son. In 8 years, he will be twice as old as his son. What is the son's present age?",
    "hint": "Aptitude (Hard): F = 4S, F + 8 = 2(S + 8).",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "4",
      "6",
      "8",
      "10"
    ],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "A shopkeeper mixes 20 kg of rice costing ₹40/kg with 30 kg costing ₹50/kg. What is the average cost per kg of the mixture?",
    "hint": "Aptitude (Hard): (20 * 40 + 30 * 50) / 50.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "₹44",
      "₹46",
      "₹48",
      "₹50"
    ],
    "correctAnswer": "₹46",
    "isActive": true
  },
  {
    "text": "Which country best fits all three clues: its capital is Canberra, it is a federation of states and territories, and its longest river system includes the Murray–Darling basin?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "New Zealand",
      "Australia",
      "South Africa",
      "Canada"
    ],
    "correctAnswer": "Australia",
    "isActive": true
  },
  {
    "text": "A metal has atomic number 26, forms rust readily in moist air, and is a major component of steel. Which metal is it?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Copper",
      "Iron",
      "Zinc",
      "Nickel"
    ],
    "correctAnswer": "Iron",
    "isActive": true
  },
  {
    "text": "A 19th-century scientist is linked to natural selection, traveled on HMS Beagle, and published a major work in 1859. Which work is meant?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "The Descent of Man",
      "On the Origin of Species",
      "Principia Mathematica",
      "Silent Spring"
    ],
    "correctAnswer": "On the Origin of Species",
    "isActive": true
  },
  {
    "text": "Which city is most strongly identified with the Parthenon, while also standing on the Attic plain near the Saronic Gulf?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Athens",
      "Sparta",
      "Corinth",
      "Thebes"
    ],
    "correctAnswer": "Athens",
    "isActive": true
  },
  {
    "text": "Which country is geographically unusual because it contains both the world's largest hot desert and a coastline on the Atlantic Ocean?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Egypt",
      "Morocco",
      "Algeria",
      "Sudan"
    ],
    "correctAnswer": "Algeria",
    "isActive": true
  },
  {
    "text": "An object travels around the Sun, is massive enough to be nearly spherical, and has cleared most objects from its orbital neighborhood. Under the IAU definition, what category does it occupy?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Asteroid",
      "Dwarf planet",
      "Planet",
      "Comet"
    ],
    "correctAnswer": "Planet",
    "isActive": true
  },
  {
    "text": "Which historical empire used Constantinople as its capital for centuries and preserved Roman state traditions after the fall of the Western Roman Empire?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Ottoman Empire",
      "Byzantine Empire",
      "Holy Roman Empire",
      "Macedonian Empire"
    ],
    "correctAnswer": "Byzantine Empire",
    "isActive": true
  },
  {
    "text": "Which African lake is notable for being one of the world's largest freshwater lakes by surface area and for lying between countries including Tanzania, Uganda, and Kenya?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Lake Chad",
      "Lake Victoria",
      "Lake Tanganyika",
      "Lake Malawi"
    ],
    "correctAnswer": "Lake Victoria",
    "isActive": true
  },
  {
    "text": "A scientist discovered X-rays, while another investigated radioactivity and won Nobel Prizes in Physics and Chemistry. Which pair is correct?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Röntgen and Marie Curie",
      "Faraday and Curie",
      "Rutherford and Röntgen",
      "Bohr and Curie"
    ],
    "correctAnswer": "Röntgen and Marie Curie",
    "isActive": true
  },
  {
    "text": "Which language family includes Hindi, Bengali, Punjabi, and Marathi, making them part of a much larger linguistic grouping?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Romance",
      "Germanic",
      "Indo-European",
      "Sino-Tibetan"
    ],
    "correctAnswer": "Indo-European",
    "isActive": true
  },
  {
    "text": "Which structure in Egypt was built for Pharaoh Khufu and belongs to the group commonly called the Pyramids of Giza?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Great Pyramid",
      "Step Pyramid of Djoser",
      "Pyramid of Menkaure",
      "Pyramid of Unas"
    ],
    "correctAnswer": "Great Pyramid",
    "isActive": true
  },
  {
    "text": "Which invention made long-distance voice communication possible over electrical wires before radio broadcasting became widespread?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Telegraph",
      "Telephone",
      "Television",
      "Radar"
    ],
    "correctAnswer": "Telephone",
    "isActive": true
  },
  {
    "text": "An element is a noble gas with atomic number 10 and is commonly used in glowing signs. Which element is it?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Argon",
      "Neon",
      "Krypton",
      "Helium"
    ],
    "correctAnswer": "Neon",
    "isActive": true
  },
  {
    "text": "Which mountain is the highest above sea level and lies in the Himalayas on the Nepal–China border region?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "K2",
      "Kangchenjunga",
      "Mount Everest",
      "Lhotse"
    ],
    "correctAnswer": "Mount Everest",
    "isActive": true
  },
  {
    "text": "Which body in the Solar System has a thick nitrogen-rich atmosphere, a prominent surface of methane and nitrogen ices, and a major moon called Charon?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Titan",
      "Pluto",
      "Triton",
      "Eris"
    ],
    "correctAnswer": "Pluto",
    "isActive": true
  },
  {
    "text": "A chemical change releases heat to the surroundings, causing the nearby environment to warm. What type of reaction is this?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Endothermic",
      "Exothermic",
      "Neutralization only",
      "Photochemical"
    ],
    "correctAnswer": "Exothermic",
    "isActive": true
  },
  {
    "text": "Which planet takes about 84 Earth years to orbit the Sun and has a system of faint rings plus 27 known moons in the traditional count?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Uranus",
      "Neptune",
      "Saturn",
      "Jupiter"
    ],
    "correctAnswer": "Uranus",
    "isActive": true
  },
  {
    "text": "Which classical Greek thinker taught Alexander the Great and founded the Lyceum in Athens?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Socrates",
      "Plato",
      "Aristotle",
      "Pythagoras"
    ],
    "correctAnswer": "Aristotle",
    "isActive": true
  },
  {
    "text": "A device converts chemical energy into electrical energy through redox reactions. What broad category does it belong to?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Transformer",
      "Battery/cell",
      "Capacitor",
      "Resistor"
    ],
    "correctAnswer": "Battery/cell",
    "isActive": true
  },
  {
    "text": "Which desert is the largest hot desert on Earth and stretches across much of North Africa?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Gobi",
      "Sahara",
      "Kalahari",
      "Atacama"
    ],
    "correctAnswer": "Sahara",
    "isActive": true
  },
  {
    "text": "Which historical event is most directly associated with the phrase 'storming of the Bastille'?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Russian Revolution",
      "French Revolution",
      "American Revolution",
      "Glorious Revolution"
    ],
    "correctAnswer": "French Revolution",
    "isActive": true
  },
  {
    "text": "Which element has the chemical symbol K and is highly reactive, especially with water?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Calcium",
      "Potassium",
      "Krypton",
      "Cobalt"
    ],
    "correctAnswer": "Potassium",
    "isActive": true
  },
  {
    "text": "A spacecraft mission returned samples from an asteroid named Bennu. Which NASA mission carried out this task?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Juno",
      "OSIRIS-REx",
      "Cassini",
      "New Horizons"
    ],
    "correctAnswer": "OSIRIS-REx",
    "isActive": true
  },
  {
    "text": "Which scientist is associated with laws of planetary motion derived from astronomical observations made by Tycho Brahe?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Johannes Kepler",
      "Galileo Galilei",
      "Edwin Hubble",
      "Max Planck"
    ],
    "correctAnswer": "Johannes Kepler",
    "isActive": true
  },
  {
    "text": "Which country is home to the ancient city of Petra, famous for rock-cut architecture and its role in Nabataean history?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Jordan",
      "Lebanon",
      "Syria",
      "Israel"
    ],
    "correctAnswer": "Jordan",
    "isActive": true
  },
  {
    "text": "Which pair is correctly matched?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Nile — South America",
      "Amazon — Africa",
      "Yangtze — China",
      "Danube — India"
    ],
    "correctAnswer": "Yangtze — China",
    "isActive": true
  },
  {
    "text": "Which blood component is mainly responsible for clotting rather than carrying oxygen?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Red blood cells",
      "Platelets",
      "Plasma proteins only",
      "White blood cells"
    ],
    "correctAnswer": "Platelets",
    "isActive": true
  },
  {
    "text": "A map projection preserves local angles but can greatly distort area toward the poles. Which projection is this?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Mercator",
      "Gall-Peters",
      "Robinson",
      "Mollweide"
    ],
    "correctAnswer": "Mercator",
    "isActive": true
  },
  {
    "text": "Which ancient people are strongly associated with alphabetical writing that influenced later Greek and Latin scripts?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Phoenicians",
      "Vikings",
      "Minoans",
      "Etruscans"
    ],
    "correctAnswer": "Phoenicians",
    "isActive": true
  },
  {
    "text": "Which planet has a moon called Titan with a dense atmosphere and stable lakes and seas of liquid hydrocarbons on its surface?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune"
    ],
    "correctAnswer": "Saturn",
    "isActive": true
  },
  {
    "text": "Which Indian classical dance form is especially associated with Kerala and traditionally features elaborate makeup and highly stylized gestures?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Kathak",
      "Kathakali",
      "Odissi",
      "Manipuri"
    ],
    "correctAnswer": "Kathakali",
    "isActive": true
  },
  {
    "text": "Which body system includes the heart and blood vessels and is responsible for circulating blood?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Respiratory system",
      "Circulatory system",
      "Digestive system",
      "Nervous system"
    ],
    "correctAnswer": "Circulatory system",
    "isActive": true
  },
  {
    "text": "A historical leader became emperor after defeating rivals at Actium in 31 BCE, leading to the establishment of a new phase of Roman rule. Who was he?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Julius Caesar",
      "Augustus",
      "Nero",
      "Trajan"
    ],
    "correctAnswer": "Augustus",
    "isActive": true
  },
  {
    "text": "Which country is unusual in having three capital functions: Pretoria as administrative, Cape Town as legislative, and Bloemfontein as judicial?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "South Africa",
      "Namibia",
      "Botswana",
      "Zimbabwe"
    ],
    "correctAnswer": "South Africa",
    "isActive": true
  },
  {
    "text": "Which mathematical constant represents the ratio of a circle's circumference to its diameter?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "e",
      "φ",
      "π",
      "√2"
    ],
    "correctAnswer": "π",
    "isActive": true
  },
  {
    "text": "Which continent has the greatest number of sovereign states, making it the most politically diverse continent by country count?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Asia",
      "Africa",
      "Europe",
      "South America"
    ],
    "correctAnswer": "Africa",
    "isActive": true
  },
  {
    "text": "Which ocean lies directly east of Africa, west of Australia, and north of Antarctica?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Southern Ocean"
    ],
    "correctAnswer": "Indian Ocean",
    "isActive": true
  },
  {
    "text": "Which metal is extracted from bauxite and is prized for low density and resistance to corrosion due to its oxide layer?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Aluminium",
      "Tin",
      "Lead",
      "Silver"
    ],
    "correctAnswer": "Aluminium",
    "isActive": true
  },
  {
    "text": "Which Indian city is associated with the Gateway of India and lies on the Arabian Sea coast?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Kolkata",
      "Mumbai",
      "Chennai",
      "Visakhapatnam"
    ],
    "correctAnswer": "Mumbai",
    "isActive": true
  },
  {
    "text": "Which major world river flows through Cairo and has historically supported agriculture in northeastern Africa?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Niger",
      "Nile",
      "Congo",
      "Zambezi"
    ],
    "correctAnswer": "Nile",
    "isActive": true
  },
  {
    "text": "Which scientist formulated the three laws of motion and the law of universal gravitation in the work Philosophiæ Naturalis Principia Mathematica?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Isaac Newton",
      "Albert Einstein",
      "James Clerk Maxwell",
      "Robert Hooke"
    ],
    "correctAnswer": "Isaac Newton",
    "isActive": true
  },
  {
    "text": "Which country is associated with the city of Kyoto, the former imperial capital known for temples and traditional Japanese culture?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "China",
      "Japan",
      "South Korea",
      "Vietnam"
    ],
    "correctAnswer": "Japan",
    "isActive": true
  },
  {
    "text": "Which combination is correct: a) largest internal organ of the human body, b) main organ of gas exchange?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Heart and kidney",
      "Liver and lungs",
      "Lungs and liver",
      "Brain and lungs"
    ],
    "correctAnswer": "Liver and lungs",
    "isActive": true
  },
  {
    "text": "Which gas is the second most abundant component of Earth's atmosphere after nitrogen and is essential for aerobic respiration?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Oxygen",
      "Argon",
      "Carbon dioxide",
      "Hydrogen"
    ],
    "correctAnswer": "Oxygen",
    "isActive": true
  },
  {
    "text": "Which country is home to the ancient Nazca Lines, while its capital is Lima?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Peru",
      "Chile",
      "Ecuador",
      "Bolivia"
    ],
    "correctAnswer": "Peru",
    "isActive": true
  },
  {
    "text": "A lunar crater bears the name of a physicist who developed a famous uncertainty relation in quantum mechanics. Who is the scientist?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Erwin Schrödinger",
      "Werner Heisenberg",
      "Paul Dirac",
      "Niels Bohr"
    ],
    "correctAnswer": "Werner Heisenberg",
    "isActive": true
  },
  {
    "text": "Which architectural monument was commissioned by Shah Jahan and stands on the Yamuna River in Agra?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Qutub Minar",
      "Taj Mahal",
      "Sanchi Stupa",
      "Gol Gumbaz"
    ],
    "correctAnswer": "Taj Mahal",
    "isActive": true
  },
  {
    "text": "Which country contains the ancient city of Angkor and the temple complex Angkor Wat?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Thailand",
      "Cambodia",
      "Laos",
      "Myanmar"
    ],
    "correctAnswer": "Cambodia",
    "isActive": true
  },
  {
    "text": "Which process allows green plants to convert light energy into chemical energy while taking in carbon dioxide?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Respiration",
      "Photosynthesis",
      "Fermentation",
      "Transpiration"
    ],
    "correctAnswer": "Photosynthesis",
    "isActive": true
  },
  {
    "text": "Which famous sea route connects the Mediterranean to the Red Sea and greatly shortens the maritime route between Europe and Asia?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Panama Canal",
      "Suez Canal",
      "Kiel Canal",
      "Corinth Canal"
    ],
    "correctAnswer": "Suez Canal",
    "isActive": true
  },
  {
    "text": "Which country is both an island nation and the birthplace of the Olympic sport of modern judo?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Japan",
      "South Korea",
      "Indonesia",
      "Philippines"
    ],
    "correctAnswer": "Japan",
    "isActive": true
  },
  {
    "text": "Which planet has a day longer than its year and rotates in the opposite direction to most planets in the Solar System?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Mercury",
      "Venus",
      "Mars",
      "Neptune"
    ],
    "correctAnswer": "Venus",
    "isActive": true
  },
  {
    "text": "Which element is essential to hemoglobin's oxygen-binding function and has chemical symbol Fe?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Iron",
      "Fluorine",
      "Francium",
      "Fermium"
    ],
    "correctAnswer": "Iron",
    "isActive": true
  },
  {
    "text": "Which country contains both Mount Fuji and the city of Hiroshima?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Japan",
      "China",
      "South Korea",
      "Taiwan"
    ],
    "correctAnswer": "Japan",
    "isActive": true
  },
  {
    "text": "Which civilization is associated with Tenochtitlan, a powerful city built on an island in Lake Texcoco?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Maya",
      "Aztec",
      "Inca",
      "Moche"
    ],
    "correctAnswer": "Aztec",
    "isActive": true
  },
  {
    "text": "Which branch of science studies weather and the short-term state of the atmosphere?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Geology",
      "Meteorology",
      "Ecology",
      "Oceanography"
    ],
    "correctAnswer": "Meteorology",
    "isActive": true
  },
  {
    "text": "Which mountain range separates much of the Indian subcontinent from the Tibetan Plateau?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Alps",
      "Andes",
      "Himalayas",
      "Rockies"
    ],
    "correctAnswer": "Himalayas",
    "isActive": true
  },
  {
    "text": "Which country's name is commonly linked to the ancient Persian Empire, while Persepolis served as one of its ceremonial centers?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Iran",
      "Iraq",
      "Turkey",
      "Afghanistan"
    ],
    "correctAnswer": "Iran",
    "isActive": true
  },
  {
    "text": "Which two elements make up water, when considering its chemical composition?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Carbon and oxygen",
      "Hydrogen and oxygen",
      "Nitrogen and hydrogen",
      "Hydrogen and carbon"
    ],
    "correctAnswer": "Hydrogen and oxygen",
    "isActive": true
  },
  {
    "text": "Which city is associated with the Colosseum, Roman Forum, and Vatican City being located within the same metropolitan area?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Rome",
      "Naples",
      "Florence",
      "Milan"
    ],
    "correctAnswer": "Rome",
    "isActive": true
  },
  {
    "text": "Which scientific law states that pressure and volume of a gas are inversely related at constant temperature?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Charles's law",
      "Boyle's law",
      "Ohm's law",
      "Hooke's law"
    ],
    "correctAnswer": "Boyle's law",
    "isActive": true
  },
  {
    "text": "Which country has the world's largest island, Greenland, as an autonomous territory within its kingdom?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Norway",
      "Denmark",
      "Iceland",
      "Sweden"
    ],
    "correctAnswer": "Denmark",
    "isActive": true
  },
  {
    "text": "Which Indian state is associated with Kaziranga National Park, a major refuge for the one-horned rhinoceros?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Assam",
      "Odisha",
      "West Bengal",
      "Bihar"
    ],
    "correctAnswer": "Assam",
    "isActive": true
  },
  {
    "text": "Which planet is the largest by mass in the Solar System and has a magnetic field much stronger than Earth's?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Saturn",
      "Jupiter",
      "Neptune",
      "Uranus"
    ],
    "correctAnswer": "Jupiter",
    "isActive": true
  },
  {
    "text": "Which Indian mathematician is famous for remarkable work in number theory and is associated with rapidly convergent series for π?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Aryabhata",
      "Srinivasa Ramanujan",
      "Bhaskara II",
      "Pingala"
    ],
    "correctAnswer": "Srinivasa Ramanujan",
    "isActive": true
  },
  {
    "text": "Which African desert is famous for very high sand dunes and lies mainly in Namibia and parts of Botswana and South Africa?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Sahara",
      "Namib",
      "Kalahari",
      "Danakil"
    ],
    "correctAnswer": "Namib",
    "isActive": true
  },
  {
    "text": "Which city was historically divided by a wall and became a symbol of the Cold War before reunification in 1990?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Vienna",
      "Berlin",
      "Prague",
      "Warsaw"
    ],
    "correctAnswer": "Berlin",
    "isActive": true
  },
  {
    "text": "Which country is home to Mount Kilimanjaro, Africa's highest mountain above sea level?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Kenya",
      "Tanzania",
      "Uganda",
      "Ethiopia"
    ],
    "correctAnswer": "Tanzania",
    "isActive": true
  },
  {
    "text": "Which ancient Indian text is one of the major sources for the concept of zero and mathematical astronomy in early Indian tradition?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Arthashastra",
      "Aryabhatiya",
      "Natya Shastra",
      "Charaka Samhita"
    ],
    "correctAnswer": "Aryabhatiya",
    "isActive": true
  },
  {
    "text": "Which country contains the Atacama Desert, one of the driest non-polar regions on Earth, along its Pacific coast?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Peru",
      "Chile",
      "Argentina",
      "Ecuador"
    ],
    "correctAnswer": "Chile",
    "isActive": true
  },
  {
    "text": "Which historical empire was centered in Anatolia and later captured Constantinople in 1453?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Ottoman Empire",
      "Mongol Empire",
      "Safavid Empire",
      "Achaemenid Empire"
    ],
    "correctAnswer": "Ottoman Empire",
    "isActive": true
  },
  {
    "text": "Which human organ is primarily responsible for filtering blood and producing urine, while also helping regulate fluid balance?",
    "hint": "Contextual General Knowledge MCQ: select the correct option.",
    "type": "MCQ",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [
      "Liver",
      "Kidney",
      "Pancreas",
      "Spleen"
    ],
    "correctAnswer": "Kidney",
    "isActive": true
  }
];

async function seedQuestions() {
  console.log('🌱 Seeding user questions (' + USER_QUESTIONS.length + ' questions)...\n');

  // Remove existing questions first to prevent duplicates
  await prisma.questionAssignment.deleteMany({});
  await prisma.question.deleteMany({});

  // Insert in batches of 50
  const batchSize = 50;
  for (let i = 0; i < USER_QUESTIONS.length; i += batchSize) {
    const chunk = USER_QUESTIONS.slice(i, i + batchSize);
    await prisma.question.createMany({
      data: chunk,
    });
    console.log(`   Saved questions ${i + 1} to ${Math.min(i + batchSize, USER_QUESTIONS.length)}`);
  }

  const totalInDb = await prisma.question.count();
  const codingCount = await prisma.question.count({ where: { type: 'CODING' } });
  const easyCodingCount = await prisma.question.count({ where: { type: 'CODING', isLadderQuestion: false } });
  const hardCodingCount = await prisma.question.count({ where: { type: 'CODING', isLadderQuestion: true } });
  const physicalCount = await prisma.question.count({ where: { type: 'PHYSICAL' } });
  const numericalCount = await prisma.question.count({ where: { type: 'NUMERICAL' } });
  const mcqCount = await prisma.question.count({ where: { type: 'MCQ' } });

  console.log('\n✅ Questions successfully seeded!');
  console.log(`📊 Total questions in database: ${totalInDb}`);
  console.log(`   • Coding / Output Total (Snakes & Ladders): ${codingCount}`);
  console.log(`     - Easy Coding (Blocks 1–80):   ${easyCodingCount}`);
  console.log(`     - Hard Coding (Blocks 81–150): ${hardCodingCount}`);
  console.log(`   • Physical challenges (Blank blocks): ${physicalCount}`);
  console.log(`   • Numerical questions (Blank blocks): ${numericalCount}`);
  console.log(`   • MCQ questions (Blank blocks): ${mcqCount}`);
}

if (require.main === module) {
  seedQuestions()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Error seeding questions:', err);
      process.exit(1);
    });
}

module.exports = seedQuestions;
