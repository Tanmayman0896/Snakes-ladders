const prisma = require('../src/config/db');

const USER_QUESTIONS = [
  {
    "text": "Swap two numbers using operator.",
    "hint": "Think about operators (e.g. arithmetic + and -, or bitwise XOR ^)",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int a = 5, b = 10; a = a ^ b; b = a ^ b; a = a ^ b; cout << a << ' ' << b;",
    "isActive": true
  },
  {
    "text": "Find the sum of first N natural numbers",
    "hint": "Use a loop from 1 to N and keep adding each number to a variable initialized to 0",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n, sum = 0; cin >> n; for (int i = 1; i <= n; i++) sum += i; cout << sum;",
    "isActive": true
  },
  {
    "text": "Multiply the number by itself and print the result",
    "hint": "Take a number as input and multiply it by itself",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n; cin >> n; cout << n * n;",
    "isActive": true
  },
  {
    "text": "Find the last digit of a number",
    "hint": "Use the modulus (%) operator with 10 to get the last digit.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n; cin >> n; cout << n % 10;",
    "isActive": true
  },
  {
    "text": "Print a triangle where each row contains consecutive numbers starting from 1",
    "hint": "Use nested loops. The outer loop controls rows, inner loop prints numbers from 1 to row number.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n; cin >> n; for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) cout << j << ' '; cout << endl; }",
    "isActive": true
  },
  {
    "text": "Print a centered pyramid using stars",
    "hint": "Use two inner loops: spaces (n-i) and stars (2*i-1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n; cin >> n; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n - i; j++) cout << ' '; for (int j = 1; j <= 2 * i - 1; j++) cout << '*'; cout << endl; }",
    "isActive": true
  },
  {
    "text": "GCD of two number",
    "hint": "Use the Euclidean Algorithm: replace a with b and b with a % b until b is 0.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int a, b; cin >> a >> b; while (b != 0) { int temp = b; b = a % b; a = temp; } cout << a;",
    "isActive": true
  },
  {
    "text": "Check Armstrong Number",
    "hint": "Extract each digit using % 10, raise it to the number of digits, and add to sum. Compare with original.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int n, t, sum = 0, d = 0; cin >> n; t = n; while (t) { d++; t /= 10; } t = n; while (t) { sum += pow(t % 10, d); t /= 10; } cout << (sum == n ? 'Armstrong' : 'Not Armstrong');",
    "isActive": true
  },
  {
    "text": "Count the number of vowels in a string",
    "hint": "Convert uppercase to lowercase using ASCII (+32), then check against the 5 vowels.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int cnt=0; for(int i=0; str[i]; i++) { char c=str[i]; if(c>='A' && c<='Z') c+=32; if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cnt++; }",
    "isActive": true
  },
  {
    "text": "Find the second largest element in an array (without sorting).",
    "hint": "Track largest and second largest in one pass, shift m1 into m2 when a new max is found.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int m1=INT_MIN, m2=INT_MIN; for(int i=0; i<n; i++) { if(arr[i]>m1) { m2=m1; m1=arr[i]; } else if(arr[i]>m2 && arr[i]!=m1) m2=arr[i]; } printf('%d', m2);",
    "isActive": true
  },
  {
    "text": "Find the sum of even elements and the sum of odd elements of an array separately",
    "hint": "Use % 2 to check each element and add it to the matching sum.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int se=0, so=0; for(int i=0; i<n; i++) { if(arr[i]%2==0) se+=arr[i]; else so+=arr[i]; } printf('%d %d', se, so);",
    "isActive": true
  },
  {
    "text": "Linear search",
    "hint": "Start with pos = -1, update it on the first match, and break.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int pos=-1; for(int i=0; i<n; i++) { if(arr[i]==key) { pos=i; break; } } printf('%d', pos);",
    "isActive": true
  },
  {
    "text": "Check whether an array is sorted in ascending order",
    "hint": "If any element is greater than the next one, the array is not sorted.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int ok=1; for(int i=0; i<n-1; i++) { if(arr[i]>arr[i+1]) { ok=0; break; } } printf(ok ? 'Sorted' : 'Not sorted');",
    "isActive": true
  },
  {
    "text": "Bubble Sort Code",
    "hint": "Compare adjacent elements and swap them if they are in the wrong order.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "for (int i = 0; i < n-1; i++) for (int j = 0; j < n-i-1; j++) if (a[j] > a[j+1]) swap(a[j], a[j+1]);",
    "isActive": true
  },
  {
    "text": "Given an array, swap its first and last elements and print the updated array",
    "hint": "Use a temporary variable or the built-in swap() function.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "swap(a[0], a[n-1]); for (int i = 0; i < n; i++) cout << a[i] << ' ';",
    "isActive": true
  },
  {
    "text": "Code to Print Current Time",
    "hint": "Use time(0) to get current system time and ctime() to convert to readable format.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "time_t now = time(0); cout << ctime(&now);",
    "isActive": true
  },
  {
    "text": "Code to Print Current Date",
    "hint": "Use time(0), localtime(), and put_time() with '%d-%m-%Y'.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "time_t now = time(0); tm *t = localtime(&now); cout << put_time(t, '%d-%m-%Y');",
    "isActive": true
  },
  {
    "text": "Check overflow condition in stack",
    "hint": "Before inserting, check whether top == MAX - 1. If true, the stack is full.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (top == MAX - 1) cout << 'Stack Overflow'; else { top++; stack[top] = x; }",
    "isActive": true
  },
  {
    "text": "Check underflow condition in stack",
    "hint": "Before pop(), check whether top == -1. If true, the stack is empty.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (top == -1) cout << 'Stack Underflow'; else { cout << 'Popped: ' << stack[top]; top--; }",
    "isActive": true
  },
  {
    "text": "Implement the Push Operation in a Stack",
    "hint": "Check whether top == MAX - 1 before insertion. If not, stack[++top] = x.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (top == MAX - 1) cout << 'Stack Overflow'; else { stack[++top] = x; }",
    "isActive": true
  },
  {
    "text": "Implement the Pop Operation in a Stack",
    "hint": "Check whether top == -1. If not, return stack[top--].",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (top == -1) cout << 'Stack Underflow'; else { cout << stack[top]; top--; }",
    "isActive": true
  },
  {
    "text": "Implement the Enqueue Operation",
    "hint": "Check rear == MAX - 1. If empty, initialize front = 0, increment rear, and insert.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (rear == MAX - 1) cout << 'Queue Overflow'; else { if (front == -1) front = 0; queue[++rear] = x; }",
    "isActive": true
  },
  {
    "text": "Implement the Dequeue Operation",
    "hint": "Check front == -1 || front > rear. If not, display queue[front] and increment front.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "if (front == -1 || front > rear) cout << 'Queue Underflow'; else { cout << queue[front]; front++; }",
    "isActive": true
  },
  {
    "text": "Insert 10 Elements into an Array",
    "hint": "Use a for loop from 0 to 9 to input and display the elements.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int a[10]; for (int i = 0; i < 10; i++) cin >> a[i]; for (int i = 0; i < 10; i++) cout << a[i] << ' ';",
    "isActive": true
  },
  {
    "text": "Implement Inorder function Traversals in a Binary Tree",
    "hint": "Left -> Root -> Right",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "void inorder(Node* root) { if (!root) return; inorder(root->left); cout << root->data << ' '; inorder(root->right); }",
    "isActive": true
  },
  {
    "text": "Implement Preorder function Traversals in a Binary Tree",
    "hint": "Root -> Left -> Right",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "void preorder(Node* root) { if (!root) return; cout << root->data << ' '; preorder(root->left); preorder(root->right); }",
    "isActive": true
  },
  {
    "text": "Implement Postorder function Traversals in a Binary Tree",
    "hint": "Left -> Right -> Root",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "void postorder(Node* root) { if (!root) return; postorder(root->left); postorder(root->right); cout << root->data << ' '; }",
    "isActive": true
  },
  {
    "text": "Print Your Name and Event Name in C",
    "hint": "Use printf",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "printf('Name: \\n'); printf('Event: Venom 2.0');",
    "isActive": true
  },
  {
    "text": "Write a program to print all numbers from 1 to 100 using a loop.",
    "hint": "Use loop: for (int i = 1; i <= 100; i++) printf('%d ', i);",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "for (int i = 1; i <= 100; i++) printf('%d ', i);",
    "isActive": true
  },
  {
    "text": "Write a C program to print all uppercase English alphabets from A to Z using a loop.",
    "hint": "Use loop from 'A' to 'Z' and print using %c.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "for (char i = 'A'; i <= 'Z'; i++) printf('%c ', i);",
    "isActive": true
  },
  {
    "text": "Find the Factorial of a Number",
    "hint": "Recursive: return 1 when n is 0 or 1; otherwise, return n * factorial(n-1).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int factorial(int n) { if (n <= 1) return 1; return n * factorial(n - 1); }",
    "isActive": true
  },
  {
    "text": "Fibonacci Series Using Recursion",
    "hint": "First two terms are 0 and 1. Return fib(n-1) + fib(n-2).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "int fib(int n) { if (n <= 1) return n; return fib(n - 1) + fib(n - 2); }",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 5;\n  printf(\"%d \", a++);\n  printf(\"%d\", a);\n  return 0;\n}\nWhat is the output?",
    "hint": "Post-increment uses current value first, then increments it.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "5 6",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 10;\n  if (x > 5)\n    if (x < 15)\n      printf(\"A\");\n    else\n      printf(\"B\");\n  return 0;\n}\nWhat is the output?",
    "hint": "Both conditions are true. Else belongs to the nearest unmatched if.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "A",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int i;\n  for (i = 1; i <= 5; i++);\n  printf(\"%d\", i);\n  return 0;\n}\nWhat is the output?",
    "hint": "Notice the semicolon immediately after the for loop header.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "6",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 10;\n  printf(\"%d\", x / 3 * 3);\n  return 0;\n}\nWhat is the output?",
    "hint": "Integer division: 10 / 3 = 3, then 3 * 3 = 9.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "9",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 0;\n  if (x = 5)\n    printf(\"True\");\n  else\n    printf(\"False\");\n  return 0;\n}\nWhat is the output?",
    "hint": "(=) assigns 5, which evaluates to non-zero (true).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "True",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int a = 4;\n  printf(\"%d\", a << 1);\n  return 0;\n}\nWhat is the output?",
    "hint": "Left-shifting by one bit doubles positive integer.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 7;\n  printf(\"%d\", x > 5 && x < 10);\n  return 0;\n}\nWhat is the output?",
    "hint": "Logical operators return 1 for true and 0 for false in C.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "1",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int x = 5;\n  int *p = &x;\n  *p = *p + 10;\n  printf(\"%d\", x);\n  return 0;\n}\nWhat is the output?",
    "hint": "Dereferencing a pointer modifies original variable.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "15",
    "isActive": true
  },
  {
    "text": "#include <stdio.h>\nint main() {\n  int i = 5;\n  do {\n    printf(\"%d \", i);\n    i--;\n  } while (i > 2);\n  return 0;\n}\nWhat is the output?",
    "hint": "A do-while loop executes its body before checking condition.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "5 4 3 ",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = 5n + 10",
    "hint": "Ignore constants and lower-order terms.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nvoid fun(int n) {\n  if(n<=1) return;\n  fun(n/2);\n  fun(n/2);\n}",
    "hint": "Two recursive calls, each with half input: T(n) = 2T(n/2) + O(1) => O(n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i<=n; i++)\n  for(int j=1; j<=n; j+=i)\n    cout << j;",
    "hint": "Harmonic sum: n/1 + n/2 + n/3 + ... = n * ln(n) = O(n log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i*i<=n; i++)\n  for(int j=1; j*j<=n; j++)\n    cout << i+j;",
    "hint": "Both loops execute sqrt(n) times: sqrt(n) * sqrt(n) = n.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of:\nfor(int i=1; i<n; i*=3)\n  cout << i;",
    "hint": "Loop variable multiplies by 3: O(log_3 n) = O(log n).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n² + 2ⁿ + n!",
    "hint": "Factorial growth dominates exponential and polynomial.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n!)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = log(log n)",
    "hint": "Logarithm applied twice.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(log log n)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n(n + 1)/2",
    "hint": "(n^2 + n) / 2 = O(n^2).",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n²)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = n! + 2ⁿ",
    "hint": "Factorial grows faster than exponential.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(n!)",
    "isActive": true
  },
  {
    "text": "Find the time complexity of: T(n) = √n + log n",
    "hint": "n^0.5 dominates log n.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "O(√n)",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display your name and the event name on a webpage",
    "hint": "Use <h1> and <h2> tags inside <body> section to display name and event.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to insert an image into a webpage.",
    "hint": "Use the <img> tag with src and alt.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to change the webpage background color to red",
    "hint": "Use style='background-color: red;' on body tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display a heading with a font size of 30px.",
    "hint": "Use style='font-size: 30px;' on heading tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to display a heading in red color",
    "hint": "Use style='color: red;' on heading tag.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to create a link that redirects to IEEE CS Website",
    "hint": "Use <a href='https://cs.ieeemuj.com/'>Visit</a>.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to insert a horizontal line between two paragraph",
    "hint": "Use <hr> tag between two <p> tags.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to center-align a heading",
    "hint": "Use style='text-align: center;' on heading.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to change a paragraph's font family to Snap ITC",
    "hint": "Use style='font-family: Snap ITC;'.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
    "isActive": true
  },
  {
    "text": "Write an HTML program to create a button with a red background and white text and write Venom 2.0 on it.",
    "hint": "Use <button style='background-color: red; color: white;'>Venom 2.0</button>.",
    "type": "CODING",
    "isSnakeQuestion": true,
    "isLadderQuestion": true,
    "options": [],
    "correctAnswer": "accepted",
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
    "text": "Convert (243)₅ into decimal.",
    "hint": "Category: Number System. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "73",
    "isActive": true
  },
  {
    "text": "Convert (2B)₁₂ into decimal, where A = 10 and B = 11.",
    "hint": "Category: Number System. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "35",
    "isActive": true
  },
  {
    "text": "If (x3)₇ = 45₁₀, find x.",
    "hint": "Category: Number System. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "6",
    "isActive": true
  },
  {
    "text": "Express decimal 94 in base 5.",
    "hint": "Category: Number System. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "(334)₅",
    "isActive": true
  },
  {
    "text": "Which is larger: (132)₄ or (101)₅?",
    "hint": "Category: Number System. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "(132)₄",
    "isActive": true
  },
  {
    "text": "Toggle the 3rd bit from the right in 10110110₂.",
    "hint": "Category: Bitwise / Complement. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "10110010₂",
    "isActive": true
  },
  {
    "text": "Perform a 2-bit circular left rotation on 10010110.",
    "hint": "Category: Bitwise / Complement. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "1011010",
    "isActive": true
  },
  {
    "text": "Clear the last 3 bits of 11011101₂.",
    "hint": "Category: Bitwise / Complement. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "11011000₂",
    "isActive": true
  },
  {
    "text": "Evaluate (42 | 5) & 31.",
    "hint": "Category: Bitwise / Complement. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "15",
    "isActive": true
  },
  {
    "text": "What decimal value does the 8-bit two's-complement number 11101101 represent?",
    "hint": "Category: Bitwise / Complement. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "-19",
    "isActive": true
  },
  {
    "text": "Find the output: int x=4; int y=x++ + ++x; System.out.println(x); System.out.println(y);",
    "hint": "Category: Operators / Loops. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "x = 6, y = 10",
    "isActive": true
  },
  {
    "text": "Find the final value of n: int n=5; for(int i=1;i<=n;i++) n-=i;",
    "hint": "Category: Operators / Loops. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "2",
    "isActive": true
  },
  {
    "text": "Find the output: int sum=0; for(int i=1;i<=10;i++){ if(i%3==0) continue; sum+=i; } System.out.println(sum);",
    "hint": "Category: Operators / Loops. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "37",
    "isActive": true
  },
  {
    "text": "Find the final value of sum: int sum=0; for(int i=1;i<=3;i++) for(int j=1;j<=i;j++) sum+=i*j;",
    "hint": "Category: Operators / Loops. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "25",
    "isActive": true
  },
  {
    "text": "Find the final value of x: int x=2; for(int i=0;i<4;i++) x=x*2-i;",
    "hint": "Category: Operators / Loops. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "21",
    "isActive": true
  },
  {
    "text": "Find the smallest 3-digit number divisible by both 7 and 9.",
    "hint": "Category: Slightly Tricky. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "126",
    "isActive": true
  },
  {
    "text": "Find the largest 4-digit number divisible by both 12 and 15.",
    "hint": "Category: Slightly Tricky. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9960",
    "isActive": true
  },
  {
    "text": "How many integers from 1 to 100 are divisible by neither 2 nor 3?",
    "hint": "Category: Slightly Tricky. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "33",
    "isActive": true
  },
  {
    "text": "What is the output? byte b=127; b=(byte)(b+1); System.out.println(b);",
    "hint": "Category: Slightly Tricky. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "-128",
    "isActive": true
  },
  {
    "text": "What is the output? int n=58372; int x=n%1000; System.out.println(x);",
    "hint": "Category: Slightly Tricky. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "372",
    "isActive": true
  },
  {
    "text": "Perform binary addition: (1011)₂+(1101)₂",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "11000₂ = 24₁₀",
    "isActive": true
  },
  {
    "text": "Find the loop count: for(i = 0; i < 20; i++).",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "20",
    "isActive": true
  },
  {
    "text": "Convert (156)8 to binary.",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "1101110",
    "isActive": true
  },
  {
    "text": "How many bits are required to represent decimal 255?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "8 bits",
    "isActive": true
  },
  {
    "text": "Evaluate 1<<5",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "32",
    "isActive": true
  },
  {
    "text": "Evaluate 64>>3",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "Find the decimal value of (10101010)2",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "170",
    "isActive": true
  },
  {
    "text": "Evaluate 12 & 10",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "Convert decimal 725 to hexadecimal.",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "2D5",
    "isActive": true
  },
  {
    "text": "Find the decimal result of (10110110)2⊕(11001101)2",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "123",
    "isActive": true
  },
  {
    "text": "Evaluate (3≪5)+(64≫2)",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "112",
    "isActive": true
  },
  {
    "text": "Find the loop count: for(i = 1; i <= 500; i *= 2).",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9",
    "isActive": true
  },
  {
    "text": "Evaluate (1≪10)−(1≪4)",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "1008",
    "isActive": true
  },
  {
    "text": "Find the number of set bits in (111011101101)2",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "10",
    "isActive": true
  },
  {
    "text": "Find the loop count for while(i != 0) { i /= 2; } when i=150",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "8",
    "isActive": true
  },
  {
    "text": "For how many values from 11 to 250 is i % 15 == 0 true?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "16",
    "isActive": true
  },
  {
    "text": "Evaluate 250−(10110101)2",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "69",
    "isActive": true
  },
  {
    "text": "Evaluate (1≪12)−(1≪7)+(1≪3)",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "3976",
    "isActive": true
  },
  {
    "text": "Find the 2's complement of (10110101)2 using 8 bits and give its decimal value.",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "75",
    "isActive": true
  },
  {
    "text": "Perform a 2-bit circular right rotation on (11010010)2",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "10110100",
    "isActive": true
  },
  {
    "text": "Binary search is performed on a sorted array containing 1024 elements. What is the maximum number of comparisons required to find an element?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "10",
    "isActive": true
  },
  {
    "text": "A sorting algorithm takes 2 seconds for 1,000 elements and its running time is proportional to n2. Approximately how long will it take for 5,000 elements?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "50",
    "isActive": true
  },
  {
    "text": "A program reduces the problem size by half after every iteration. Starting with n=512, how many iterations are required to reach n=1?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "9",
    "isActive": true
  },
  {
    "text": "An integer array contains 50 elements, with each integer occupying 4 bytes. How many bytes of memory does the array require?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "200 bytes",
    "isActive": true
  },
  {
    "text": "A 2D array has dimensions 6 × 8, and each element occupies 4 bytes. What is the total memory required?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "192 bytes",
    "isActive": true
  },
  {
    "text": "An 8-bit unsigned number is stored in a register. What is the maximum decimal value that can be represented?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "255",
    "isActive": true
  },
  {
    "text": "An array has 2,000 elements. If 3 operations are performed for each element, how many operations are performed in total?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "6000",
    "isActive": true
  },
  {
    "text": "Shift (101101)₂ left by 2 positions. Find the result in binary and decimal.",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "10110100₂ = 180",
    "isActive": true
  },
  {
    "text": "Which is larger: (203)4 or (123)5?",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "(123)5",
    "isActive": true
  },
  {
    "text": "If (x2)₅ = 17₁₀, find x",
    "hint": "Category: Numerical. Solve step-by-step and write the exact numerical answer.",
    "type": "NUMERICAL",
    "isSnakeQuestion": false,
    "isLadderQuestion": false,
    "options": [],
    "correctAnswer": "3",
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
  console.log('🌱 Seeding user questions (245 questions)...\n');

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
  const physicalCount = await prisma.question.count({ where: { type: 'PHYSICAL' } });
  const numericalCount = await prisma.question.count({ where: { type: 'NUMERICAL' } });
  const mcqCount = await prisma.question.count({ where: { type: 'MCQ' } });

  console.log('\n✅ Questions successfully seeded!');
  console.log(`📊 Total questions in database: ${totalInDb}`);
  console.log(`   • Coding / Output (Snakes & Ladders): ${codingCount}`);
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
