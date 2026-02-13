import type { WorkflowConfigV2, WorkflowStepV2 } from './types'

// ── Template Interface ──────────────────────────────────────────

export interface WorkflowTemplateDefinition {
  id: string
  name: string
  description: string
  icon: string
  category: 'employee-services' | 'it-admin' | 'business-ops'
  tags: string[]
  config: Partial<WorkflowConfigV2>
}

// ── Helpers ──────────────────────────────────────────────────────

let _counter = 0
function tid(): string {
  _counter++
  return `tpl-${_counter.toString(36)}`
}

function makeStep(order: number, overrides: Partial<WorkflowStepV2>): WorkflowStepV2 {
  return {
    id: tid(),
    order,
    title: '',
    description: '',
    templates: [],
    links: [],
    services: [],
    isExpanded: false,
    type: 'action',
    condition: '',
    retries: 0,
    inputMapping: '',
    outputMapping: '',
    errorHandling: 'stop',
    fallbackStepId: '',
    dependencies: [],
    timeout: 30000,
    ...overrides,
  }
}

// ── Employee Services Templates ──────────────────────────────────

const travelExpenseApproval: WorkflowTemplateDefinition = {
  id: 'travel-expense-approval',
  name: 'Travel Expense Approval',
  description: 'End-to-end expense submission with receipt upload, validation, and multi-level approval.',
  icon: 'Plane',
  category: 'employee-services',
  tags: ['expense', 'approval', 'finance'],
  config: {
    meta: {
      name: 'Travel Expense Approval',
      version: '1.0.0',
      description: 'Automated travel expense submission and approval workflow',
      author: '',
      tags: ['expense', 'approval', 'finance', 'travel'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Submit Expense', description: 'Employee submits expense with receipt upload and details', type: 'action' }),
      makeStep(1, { title: 'Validate Receipt', description: 'AI extracts amount, date, and vendor from receipt image', type: 'action' }),
      makeStep(2, { title: 'Manager Approval', description: 'Direct manager reviews and approves or rejects the expense', type: 'manual' }),
      makeStep(3, { title: 'Finance Review', description: 'Finance team verifies compliance and budget allocation', type: 'manual' }),
      makeStep(4, { title: 'Process Reimbursement', description: 'Approved expense is queued for reimbursement', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'webhook', config: 'form-submit', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'fixed', retryMax: 2 },
    auth: {
      enabled: true,
      methods: [{ type: 'ldap-bind', enabled: true, config: '' }],
      roles: ['employee', 'manager', 'finance'],
      rbac: true,
      policies: [],
      sessionStrategy: 'jwt',
      sessionTtl: 3600,
      mfa: false,
    },
    notifications: {
      enabled: true,
      channels: [
        { id: tid(), type: 'email', provider: 'resend', enabled: true, config: '' },
        { id: tid(), type: 'teams', provider: 'teams', enabled: true, config: '' },
      ],
    },
  },
}

const employeeBudgetRequest: WorkflowTemplateDefinition = {
  id: 'employee-budget-request',
  name: 'Employee Budget Request',
  description: 'Budget request with AI receipt extraction and manager approval chain.',
  icon: 'Wallet',
  category: 'employee-services',
  tags: ['budget', 'receipt', 'approval'],
  config: {
    meta: {
      name: 'Employee Budget Request',
      version: '1.0.0',
      description: 'Budget request workflow with AI-powered receipt processing',
      author: '',
      tags: ['budget', 'receipt', 'approval'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Submit Receipt', description: 'Employee uploads receipt photo with category and description', type: 'action' }),
      makeStep(1, { title: 'AI Extract Data', description: 'Extract amount, vendor, date, and category from receipt via OCR', type: 'action' }),
      makeStep(2, { title: 'Manager Approval', description: 'Manager reviews extracted data and approves or rejects', type: 'manual' }),
      makeStep(3, { title: 'Process Budget Entry', description: 'Approved request is deducted from employee budget and logged', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'webhook', config: 'form-submit', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'none', retryMax: 0 },
    notifications: {
      enabled: true,
      channels: [
        { id: tid(), type: 'email', provider: 'resend', enabled: true, config: '' },
      ],
    },
  },
}

const sickLeaveNotification: WorkflowTemplateDefinition = {
  id: 'sick-leave-notification',
  name: 'Sick Leave Notification',
  description: 'Automated sick leave reporting with manager notification and calendar sync.',
  icon: 'Heart',
  category: 'employee-services',
  tags: ['sick-leave', 'notification', 'calendar'],
  config: {
    meta: {
      name: 'Sick Leave Notification',
      version: '1.0.0',
      description: 'Sick leave reporting with automated notifications',
      author: '',
      tags: ['sick-leave', 'absence', 'notification'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Report Sick Leave', description: 'Employee selects dates and reports sick leave via form', type: 'action' }),
      makeStep(1, { title: 'Notify Manager', description: 'Send notification to direct manager via Teams/Slack and email', type: 'action' }),
      makeStep(2, { title: 'Update Calendar', description: 'Sync absence to shared team calendar and update availability', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'webhook', config: 'form-submit', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'fixed', retryMax: 3 },
    auth: {
      enabled: true,
      methods: [{ type: 'ldap-bind', enabled: true, config: '' }],
      roles: ['employee', 'manager'],
      rbac: true,
      policies: [],
      sessionStrategy: 'jwt',
      sessionTtl: 3600,
      mfa: false,
    },
    notifications: {
      enabled: true,
      channels: [
        { id: tid(), type: 'teams', provider: 'teams', enabled: true, config: '' },
        { id: tid(), type: 'slack', provider: 'slack', enabled: true, config: '' },
        { id: tid(), type: 'email', provider: 'resend', enabled: true, config: '' },
      ],
    },
  },
}

const formApproval: WorkflowTemplateDefinition = {
  id: 'form-approval',
  name: 'Form Approval',
  description: 'Generic form submission with review and approval workflow.',
  icon: 'FileText',
  category: 'employee-services',
  tags: ['form', 'approval', 'review'],
  config: {
    meta: {
      name: 'Form Approval',
      version: '1.0.0',
      description: 'Generic form submission and approval workflow',
      author: '',
      tags: ['form', 'approval'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Submit Form', description: 'User fills out and submits the form', type: 'action' }),
      makeStep(1, { title: 'Review Submission', description: 'Reviewer checks the submission for completeness', type: 'manual' }),
      makeStep(2, { title: 'Approve or Reject', description: 'Approver makes final decision and submitter is notified', type: 'manual' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'webhook', config: 'form-submit', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'none', retryMax: 0 },
    notifications: {
      enabled: true,
      channels: [
        { id: tid(), type: 'email', provider: 'resend', enabled: true, config: '' },
      ],
    },
  },
}

// ── IT & Admin Templates ─────────────────────────────────────────

const itOnboarding: WorkflowTemplateDefinition = {
  id: 'it-onboarding',
  name: 'IT Onboarding',
  description: 'New employee IT setup with account creation, hardware provisioning, and AD integration.',
  icon: 'UserPlus',
  category: 'it-admin',
  tags: ['onboarding', 'it', 'provisioning'],
  config: {
    meta: {
      name: 'IT Onboarding',
      version: '1.0.0',
      description: 'Automated IT onboarding for new employees',
      author: '',
      tags: ['onboarding', 'it', 'provisioning', 'ad'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Create Accounts', description: 'Create email, SSO, and application accounts for the new employee', type: 'action' }),
      makeStep(1, { title: 'Provision Hardware', description: 'Assign and configure laptop, monitors, and peripherals', type: 'manual' }),
      makeStep(2, { title: 'Setup AD Groups', description: 'Add user to appropriate Active Directory groups and security groups', type: 'action' }),
      makeStep(3, { title: 'Grant Permissions', description: 'Assign application permissions based on role and department', type: 'action' }),
      makeStep(4, { title: 'Schedule Training', description: 'Create calendar events for IT orientation and security training', type: 'action' }),
      makeStep(5, { title: 'Send Welcome Email', description: 'Send welcome email with credentials, links, and first-day instructions', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'manual', config: '', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'fixed', retryMax: 2 },
  },
}

const itOffboarding: WorkflowTemplateDefinition = {
  id: 'it-offboarding',
  name: 'IT Offboarding',
  description: 'Employee departure workflow with access revocation, data archival, and hardware collection.',
  icon: 'UserMinus',
  category: 'it-admin',
  tags: ['offboarding', 'it', 'security'],
  config: {
    meta: {
      name: 'IT Offboarding',
      version: '1.0.0',
      description: 'Secure IT offboarding for departing employees',
      author: '',
      tags: ['offboarding', 'it', 'security', 'compliance'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Revoke Access', description: 'Disable SSO, email, and all application access immediately', type: 'action' }),
      makeStep(1, { title: 'Collect Hardware', description: 'Coordinate return of laptop, badges, and equipment', type: 'manual' }),
      makeStep(2, { title: 'Archive Data', description: 'Back up user data, emails, and documents per retention policy', type: 'action' }),
      makeStep(3, { title: 'Remove AD Entry', description: 'Remove user from Active Directory and all security groups', type: 'action' }),
      makeStep(4, { title: 'Confirm Completion', description: 'Generate offboarding report and confirm all steps completed', type: 'manual' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'manual', config: '', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'none', retryMax: 0 },
  },
}

// ── Business Ops Templates ───────────────────────────────────────

const recruitingPipeline: WorkflowTemplateDefinition = {
  id: 'recruiting-pipeline',
  name: 'Recruiting Pipeline',
  description: 'End-to-end hiring process from application to offer, with interview scheduling.',
  icon: 'Users',
  category: 'business-ops',
  tags: ['recruiting', 'hiring', 'hr'],
  config: {
    meta: {
      name: 'Recruiting Pipeline',
      version: '1.0.0',
      description: 'Hiring workflow from application to offer',
      author: '',
      tags: ['recruiting', 'hiring', 'hr'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Receive Application', description: 'Candidate submits application via careers page or email', type: 'action' }),
      makeStep(1, { title: 'Screen Resume', description: 'HR screens resume against job requirements', type: 'manual' }),
      makeStep(2, { title: 'Schedule Interview', description: 'Coordinate interview slots with hiring manager', type: 'action' }),
      makeStep(3, { title: 'Evaluate Candidate', description: 'Collect interview feedback and score candidate', type: 'manual' }),
      makeStep(4, { title: 'Offer or Reject', description: 'Send offer letter or rejection notification', type: 'manual' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'webhook', config: 'career-form', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'none', retryMax: 0 },
    notifications: {
      enabled: true,
      channels: [
        { id: tid(), type: 'email', provider: 'resend', enabled: true, config: '' },
        { id: tid(), type: 'slack', provider: 'slack', enabled: true, config: '' },
      ],
    },
  },
}

const invoiceApproval: WorkflowTemplateDefinition = {
  id: 'invoice-approval',
  name: 'Invoice Approval',
  description: 'Incoming invoice processing with AI data extraction and approval chain.',
  icon: 'Receipt',
  category: 'business-ops',
  tags: ['invoice', 'approval', 'accounting'],
  config: {
    meta: {
      name: 'Invoice Approval',
      version: '1.0.0',
      description: 'Automated invoice processing and approval',
      author: '',
      tags: ['invoice', 'approval', 'accounting', 'finance'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Receive Invoice', description: 'Invoice arrives via email or upload', type: 'action' }),
      makeStep(1, { title: 'Extract Data', description: 'AI extracts vendor, amount, due date, and line items', type: 'action' }),
      makeStep(2, { title: 'Approve Invoice', description: 'Budget owner reviews and approves the invoice', type: 'manual' }),
      makeStep(3, { title: 'Schedule Payment', description: 'Queue approved invoice for payment on due date', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'event', config: 'email-received', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'fixed', retryMax: 2 },
  },
}

const accountingMonthClose: WorkflowTemplateDefinition = {
  id: 'accounting-month-close',
  name: 'Accounting Month-Close',
  description: 'Monthly accounting close process with report collection, reconciliation, and archival.',
  icon: 'CalendarCheck',
  category: 'business-ops',
  tags: ['accounting', 'month-close', 'finance'],
  config: {
    meta: {
      name: 'Accounting Month-Close',
      version: '1.0.0',
      description: 'Structured monthly accounting close workflow',
      author: '',
      tags: ['accounting', 'month-close', 'finance', 'compliance'],
      license: 'proprietary',
    },
    steps: [
      makeStep(0, { title: 'Collect Reports', description: 'Gather all department financial reports and statements', type: 'action' }),
      makeStep(1, { title: 'Reconcile Accounts', description: 'Match transactions across systems and resolve discrepancies', type: 'manual' }),
      makeStep(2, { title: 'Review Entries', description: 'Review adjusting entries and accruals', type: 'manual' }),
      makeStep(3, { title: 'Manager Approval', description: 'Finance manager reviews and approves the closing package', type: 'manual' }),
      makeStep(4, { title: 'Archive & Report', description: 'Generate final reports, archive documents, and lock the period', type: 'action' }),
    ],
    triggers: { triggers: [{ id: tid(), type: 'schedule', config: 'last-business-day-monthly', enabled: true }] },
    orchestration: { mode: 'sequential', circuitBreaker: false, circuitBreakerThreshold: 5, maxConcurrency: 1, retryPolicy: 'none', retryMax: 0 },
  },
}

// ── Export All Templates ─────────────────────────────────────────

export const WORKFLOW_TEMPLATES: WorkflowTemplateDefinition[] = [
  // Employee Services
  travelExpenseApproval,
  employeeBudgetRequest,
  sickLeaveNotification,
  formApproval,
  // IT & Admin
  itOnboarding,
  itOffboarding,
  // Business Ops
  recruitingPipeline,
  invoiceApproval,
  accountingMonthClose,
]

export const TEMPLATE_CATEGORIES = [
  { value: 'employee-services', label: 'Employee Services', icon: 'Users' },
  { value: 'it-admin', label: 'IT & Admin', icon: 'Server' },
  { value: 'business-ops', label: 'Business Ops', icon: 'Briefcase' },
] as const
