#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Test the DamnBruh clone website functionality including visual verification, header functionality, game interface, wallet connection, sidebar functionality, and interactive elements"

frontend:
  - task: "Visual Layout and Design Verification"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/HomePage.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to verify the website looks like DamnBruh.com with proper layout, colors, and components"

  - task: "Header Login Button Functionality"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Header.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Login button triggers wallet connection properly"

  - task: "Game Interface Bet Selection"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/GameArea.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test bet amount selection buttons ($1, $5, $20)"

  - task: "Game Interface Name Input"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/GameArea.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test name input field functionality"

  - task: "JOIN GAME Button"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/GameArea.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test JOIN GAME button functionality"

  - task: "US and Browse Lobbies Buttons"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/GameArea.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test US and Browse Lobbies button functionality"

  - task: "Wallet Connection Functionality"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/contexts/WalletContext.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Connect Wallet button attempts MetaMask connection"

  - task: "Wallet Panel Updates"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/WalletPanel.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test wallet panel updates when wallet connection is attempted"

  - task: "Copy Address and Refresh Balance"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/WalletPanel.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Copy Address and Refresh Balance functionality when wallet connected"

  - task: "Add Funds and Cash Out Buttons"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/WalletPanel.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Add Funds and Cash Out button functionality"

  - task: "Leaderboard Section Display"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Sidebar.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to verify Leaderboard section displays properly"

  - task: "Friends Section Display"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Sidebar.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to verify Friends section shows correct message and Add Friends button works"

  - task: "Join Discord Button"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/HomePage.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Join Discord button functionality"

  - task: "Manage Affiliate Button"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/GameArea.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Manage Affiliate button functionality"

  - task: "Change Appearance Button"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/WalletPanel.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test Change Appearance button functionality"

  - task: "Interactive Elements Hover Effects"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/App.css"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to verify all buttons have proper hover effects and animations"

  - task: "Responsive Design"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/HomePage.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to check that layout works properly on different screen sizes"

metadata:
  created_by: "testing_agent"
  version: "1.0"
  test_sequence: 1

test_plan:
  current_focus:
    - "Visual Layout and Design Verification"
    - "Header Login Button Functionality"
    - "Game Interface Bet Selection"
    - "Game Interface Name Input"
    - "JOIN GAME Button"
    - "Wallet Connection Functionality"
    - "Wallet Panel Updates"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "testing"
    message: "Created comprehensive test plan for DamnBruh clone website. Will test all functionality including visual verification, wallet connection, game interface, and interactive elements. Starting with high priority items first."