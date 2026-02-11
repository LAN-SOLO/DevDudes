'use client'

import { useState, useMemo } from 'react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast'
import { FileCode, ArrowRight, Sparkles, Eye, Check, Loader2, Search, LayoutGrid, X } from 'lucide-react'
import { savePresetConfig } from '@/app/actions/pipeline'

// Templates use v1 flat config format - auto-migrated to v2 by savePresetConfig
interface TemplatePresetConfig {
  appType?: string
  industry?: string
  features?: string[]
  targetUsers?: string[]
  entities?: Array<{ name: string; fields: Array<{ name: string; type: string; required: boolean }> }>
  authMethods?: string[]
  roles?: string[]
  layout?: string
  theme?: string
  primaryColor?: string
  integrations?: string[]
  deployTarget?: string
  region?: string
  customFeatures?: string
  businessName?: string
  description?: string
}

interface Template {
  id: string
  name: string
  description: string
  features: string[]
  category: string
  presetConfig: TemplatePresetConfig
}

const templates: Template[] = [
  // ── Backoffice ──────────────────────────────────────────────
  {
    id: 'crm',
    name: 'CRM Starter',
    description: 'Customer management with contacts, deals, and pipeline tracking',
    features: ['Contacts', 'Deals', 'Pipeline', 'Reports'],
    category: 'Sales',
    presetConfig: {
      appType: 'crm',
      industry: 'Sales & Marketing',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'export'],
      targetUsers: ['sales-rep', 'manager', 'admin'],
      entities: [
        { name: 'Contact', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'phone', type: 'text', required: false },
          { name: 'company', type: 'text', required: false },
        ]},
        { name: 'Deal', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'value', type: 'number', required: true },
          { name: 'stage', type: 'select', required: true },
          { name: 'closeDate', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'manager', 'user'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#3b82f6',
      integrations: ['email', 'calendar'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'invoice',
    name: 'Invoice & Billing',
    description: 'Create invoices, track payments, manage clients and recurring billing',
    features: ['Invoices', 'Clients', 'Payments', 'Recurring', 'Tax Reports'],
    category: 'Finance',
    presetConfig: {
      appType: 'invoicing',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'payments', 'export', 'reports', 'notifications'],
      targetUsers: ['accountant', 'manager', 'admin'],
      entities: [
        { name: 'Client', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'taxId', type: 'text', required: false },
          { name: 'address', type: 'text', required: false },
          { name: 'paymentTerms', type: 'number', required: false },
        ]},
        { name: 'Invoice', fields: [
          { name: 'number', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'tax', type: 'number', required: false },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'isRecurring', type: 'boolean', required: false },
        ]},
        { name: 'Payment', fields: [
          { name: 'amount', type: 'number', required: true },
          { name: 'method', type: 'select', required: true },
          { name: 'receivedAt', type: 'date', required: true },
          { name: 'reference', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'accountant', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#8b5cf6',
      integrations: ['stripe', 'email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'hr',
    name: 'HR Portal',
    description: 'Employee management, leave requests, onboarding, and documents',
    features: ['Employees', 'Time Off', 'Onboarding', 'Documents', 'Org Chart'],
    category: 'Human Resources',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Human Resources',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'reports', 'search'],
      targetUsers: ['employee', 'hr-manager', 'admin'],
      entities: [
        { name: 'Employee', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'department', type: 'text', required: true },
          { name: 'position', type: 'text', required: true },
          { name: 'manager', type: 'text', required: false },
          { name: 'startDate', type: 'date', required: true },
        ]},
        { name: 'LeaveRequest', fields: [
          { name: 'type', type: 'select', required: true },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'reason', type: 'text', required: false },
        ]},
        { name: 'Document', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'fileUrl', type: 'text', required: true },
          { name: 'expiresAt', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'google', 'microsoft'],
      roles: ['admin', 'hr', 'manager', 'employee'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#ec4899',
      integrations: ['calendar', 'email', 'slack'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'helpdesk',
    name: 'Help Desk & Ticketing',
    description: 'Support ticket system with SLA tracking, knowledge base, and customer portal',
    features: ['Tickets', 'Knowledge Base', 'SLA Tracking', 'Reports', 'Customer Portal'],
    category: 'Support',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Customer Support',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'comments', 'export'],
      targetUsers: ['customer', 'support-agent', 'admin'],
      entities: [
        { name: 'Ticket', fields: [
          { name: 'subject', type: 'text', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'priority', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'assignee', type: 'text', required: false },
          { name: 'slaDeadline', type: 'date', required: false },
        ]},
        { name: 'Article', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'text', required: true },
          { name: 'category', type: 'text', required: true },
          { name: 'isPublished', type: 'boolean', required: true },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'agent', 'customer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#06b6d4',
      integrations: ['email', 'slack'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Submit and approve expense reports, receipt uploads, and budget tracking',
    features: ['Expenses', 'Approvals', 'Receipts', 'Budgets', 'Reports'],
    category: 'Finance',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'export', 'reports'],
      targetUsers: ['employee', 'manager', 'admin'],
      entities: [
        { name: 'ExpenseReport', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'submittedAt', type: 'date', required: true },
          { name: 'approvedBy', type: 'text', required: false },
        ]},
        { name: 'ExpenseItem', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'category', type: 'select', required: true },
          { name: 'receiptUrl', type: 'text', required: false },
          { name: 'date', type: 'date', required: true },
        ]},
        { name: 'Budget', fields: [
          { name: 'department', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'spent', type: 'number', required: false },
          { name: 'period', type: 'select', required: true },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'manager', 'employee'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#f59e0b',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'contract-management',
    name: 'Contract Manager',
    description: 'Track contracts, renewals, counterparties, and key dates',
    features: ['Contracts', 'Renewals', 'Parties', 'Alerts', 'Documents'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Legal & Compliance',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'search', 'export'],
      targetUsers: ['legal', 'manager', 'admin'],
      entities: [
        { name: 'Contract', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'counterparty', type: 'text', required: true },
          { name: 'value', type: 'number', required: false },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: true },
          { name: 'autoRenew', type: 'boolean', required: false },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'Counterparty', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'address', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'legal', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#6366f1',
      integrations: ['email', 'calendar'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'meeting-room',
    name: 'Meeting Room Booking',
    description: 'Book meeting rooms, manage resources, and view room availability',
    features: ['Rooms', 'Bookings', 'Calendar', 'Resources', 'Check-in'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Facility Management',
      features: ['authentication', 'dashboard', 'notifications', 'search'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Room', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'floor', type: 'text', required: true },
          { name: 'capacity', type: 'number', required: true },
          { name: 'amenities', type: 'text', required: false },
          { name: 'isActive', type: 'boolean', required: true },
        ]},
        { name: 'Booking', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'startTime', type: 'text', required: true },
          { name: 'endTime', type: 'text', required: true },
          { name: 'attendees', type: 'number', required: false },
        ]},
      ],
      authMethods: ['email', 'google', 'microsoft'],
      roles: ['admin', 'user'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#14b8a6',
      integrations: ['calendar'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'visitor-management',
    name: 'Visitor Management',
    description: 'Pre-register visitors, print badges, notify hosts, and track visits',
    features: ['Pre-Registration', 'Check-in', 'Badges', 'Host Alerts', 'Visit Log'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Facility Management',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'export'],
      targetUsers: ['both'],
      entities: [
        { name: 'Visitor', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: false },
          { name: 'company', type: 'text', required: false },
          { name: 'phone', type: 'text', required: false },
        ]},
        { name: 'Visit', fields: [
          { name: 'purpose', type: 'text', required: true },
          { name: 'host', type: 'text', required: true },
          { name: 'scheduledAt', type: 'date', required: true },
          { name: 'checkedInAt', type: 'date', required: false },
          { name: 'checkedOutAt', type: 'date', required: false },
          { name: 'badgePrinted', type: 'boolean', required: false },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'receptionist', 'host'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#0ea5e9',
      integrations: ['email', 'slack'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  // ── Accounting ─────────────────────────────────────────────
  {
    id: 'general-ledger',
    name: 'General Ledger',
    description: 'Chart of accounts, journal entries, trial balance, and financial statements',
    features: ['Chart of Accounts', 'Journal Entries', 'Trial Balance', 'Balance Sheet', 'P&L Report'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'search', 'export', 'reports', 'notifications'],
      targetUsers: ['accountant', 'controller', 'admin'],
      entities: [
        { name: 'Account', fields: [
          { name: 'code', type: 'text', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'parentAccount', type: 'text', required: false },
          { name: 'balance', type: 'number', required: false },
          { name: 'isActive', type: 'boolean', required: true },
        ]},
        { name: 'JournalEntry', fields: [
          { name: 'entryNumber', type: 'text', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'debitAccount', type: 'text', required: true },
          { name: 'creditAccount', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'postedBy', type: 'text', required: false },
        ]},
        { name: 'FiscalPeriod', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'isClosed', type: 'boolean', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'controller', 'accountant', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#059669',
      integrations: ['export'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'accounts-payable',
    name: 'Accounts Payable',
    description: 'Vendor bills, payment scheduling, aging reports, and approval workflows',
    features: ['Vendor Bills', 'Payment Runs', 'Aging Report', 'Approvals', 'Bank Reconciliation'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'notifications', 'export', 'reports', 'search'],
      targetUsers: ['accountant', 'manager', 'admin'],
      entities: [
        { name: 'Vendor', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'taxId', type: 'text', required: false },
          { name: 'paymentTerms', type: 'number', required: false },
          { name: 'bankAccount', type: 'text', required: false },
          { name: 'address', type: 'text', required: false },
        ]},
        { name: 'Bill', fields: [
          { name: 'billNumber', type: 'text', required: true },
          { name: 'vendor', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'tax', type: 'number', required: false },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'approvedBy', type: 'text', required: false },
          { name: 'glAccount', type: 'text', required: false },
        ]},
        { name: 'Payment', fields: [
          { name: 'paymentRef', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'method', type: 'select', required: true },
          { name: 'paidAt', type: 'date', required: true },
          { name: 'bankReference', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'ap-clerk', 'approver', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#7c3aed',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'accounts-receivable',
    name: 'Accounts Receivable',
    description: 'Customer invoices, payment tracking, aging analysis, and dunning management',
    features: ['Invoices', 'Payments', 'Aging Analysis', 'Dunning', 'Credit Limits'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'notifications', 'export', 'reports', 'search'],
      targetUsers: ['accountant', 'manager', 'admin'],
      entities: [
        { name: 'Customer', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'taxId', type: 'text', required: false },
          { name: 'creditLimit', type: 'number', required: false },
          { name: 'paymentTerms', type: 'number', required: false },
          { name: 'outstandingBalance', type: 'number', required: false },
        ]},
        { name: 'Invoice', fields: [
          { name: 'invoiceNumber', type: 'text', required: true },
          { name: 'customer', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'tax', type: 'number', required: false },
          { name: 'issueDate', type: 'date', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'dunningLevel', type: 'number', required: false },
        ]},
        { name: 'Payment', fields: [
          { name: 'receiptNumber', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'method', type: 'select', required: true },
          { name: 'receivedAt', type: 'date', required: true },
          { name: 'bankReference', type: 'text', required: false },
        ]},
        { name: 'DunningNotice', fields: [
          { name: 'level', type: 'number', required: true },
          { name: 'sentAt', type: 'date', required: true },
          { name: 'totalOverdue', type: 'number', required: true },
          { name: 'response', type: 'select', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'ar-clerk', 'manager', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#0891b2',
      integrations: ['email', 'stripe'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'payroll',
    name: 'Payroll Manager',
    description: 'Employee payroll processing, tax deductions, pay stubs, and pay run history',
    features: ['Pay Runs', 'Deductions', 'Tax Calc', 'Pay Stubs', 'Year-End Reports'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'notifications', 'export', 'reports'],
      targetUsers: ['payroll-admin', 'hr', 'admin'],
      entities: [
        { name: 'Employee', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'employeeId', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'department', type: 'text', required: true },
          { name: 'baseSalary', type: 'number', required: true },
          { name: 'payFrequency', type: 'select', required: true },
          { name: 'taxBracket', type: 'text', required: false },
          { name: 'bankAccount', type: 'text', required: false },
        ]},
        { name: 'PayRun', fields: [
          { name: 'period', type: 'text', required: true },
          { name: 'runDate', type: 'date', required: true },
          { name: 'totalGross', type: 'number', required: true },
          { name: 'totalDeductions', type: 'number', required: true },
          { name: 'totalNet', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'employeeCount', type: 'number', required: true },
        ]},
        { name: 'PayStub', fields: [
          { name: 'employee', type: 'text', required: true },
          { name: 'grossPay', type: 'number', required: true },
          { name: 'tax', type: 'number', required: true },
          { name: 'socialSecurity', type: 'number', required: false },
          { name: 'otherDeductions', type: 'number', required: false },
          { name: 'netPay', type: 'number', required: true },
        ]},
        { name: 'Deduction', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'isPercentage', type: 'boolean', required: true },
          { name: 'isPreTax', type: 'boolean', required: true },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'payroll-admin', 'hr', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#d946ef',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'fixed-assets',
    name: 'Fixed Asset Register',
    description: 'Track company assets, calculate depreciation, and manage asset lifecycle',
    features: ['Asset Register', 'Depreciation', 'Disposal', 'Revaluation', 'Reports'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'search', 'export', 'reports', 'notifications'],
      targetUsers: ['accountant', 'admin'],
      entities: [
        { name: 'Asset', fields: [
          { name: 'assetTag', type: 'text', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'category', type: 'select', required: true },
          { name: 'purchaseDate', type: 'date', required: true },
          { name: 'purchaseCost', type: 'number', required: true },
          { name: 'usefulLife', type: 'number', required: true },
          { name: 'depreciationMethod', type: 'select', required: true },
          { name: 'residualValue', type: 'number', required: false },
          { name: 'currentBookValue', type: 'number', required: false },
          { name: 'location', type: 'text', required: false },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'DepreciationSchedule', fields: [
          { name: 'period', type: 'text', required: true },
          { name: 'openingValue', type: 'number', required: true },
          { name: 'depreciationAmount', type: 'number', required: true },
          { name: 'closingValue', type: 'number', required: true },
          { name: 'isPosted', type: 'boolean', required: false },
        ]},
        { name: 'Disposal', fields: [
          { name: 'disposalDate', type: 'date', required: true },
          { name: 'salePrice', type: 'number', required: false },
          { name: 'bookValueAtDisposal', type: 'number', required: true },
          { name: 'gainLoss', type: 'number', required: true },
          { name: 'reason', type: 'select', required: true },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'accountant', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#ca8a04',
      integrations: ['export'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'tax-filing',
    name: 'Tax Filing Manager',
    description: 'Track tax obligations, filing deadlines, document management, and compliance',
    features: ['Tax Calendar', 'Filings', 'Documents', 'Compliance', 'Deadline Alerts'],
    category: 'Accounting',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'search', 'export'],
      targetUsers: ['accountant', 'tax-advisor', 'admin'],
      entities: [
        { name: 'TaxObligation', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'taxType', type: 'select', required: true },
          { name: 'jurisdiction', type: 'text', required: true },
          { name: 'frequency', type: 'select', required: true },
          { name: 'nextDueDate', type: 'date', required: true },
          { name: 'estimatedAmount', type: 'number', required: false },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'Filing', fields: [
          { name: 'filingRef', type: 'text', required: true },
          { name: 'taxType', type: 'select', required: true },
          { name: 'period', type: 'text', required: true },
          { name: 'filedDate', type: 'date', required: false },
          { name: 'amountDue', type: 'number', required: true },
          { name: 'amountPaid', type: 'number', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'confirmationNumber', type: 'text', required: false },
        ]},
        { name: 'TaxDocument', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'taxYear', type: 'text', required: true },
          { name: 'fileUrl', type: 'text', required: true },
          { name: 'expiresAt', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'tax-advisor', 'accountant', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#dc2626',
      integrations: ['calendar', 'email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    description: 'Department budgets, forecasting, variance analysis, and spending controls',
    features: ['Budgets', 'Forecasts', 'Variance Analysis', 'Approvals', 'Spend Tracking'],
    category: 'Finance',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'reports', 'export', 'notifications'],
      targetUsers: ['finance', 'manager', 'admin'],
      entities: [
        { name: 'Budget', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'department', type: 'text', required: true },
          { name: 'fiscalYear', type: 'text', required: true },
          { name: 'totalAllocated', type: 'number', required: true },
          { name: 'totalSpent', type: 'number', required: false },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'BudgetLine', fields: [
          { name: 'category', type: 'text', required: true },
          { name: 'planned', type: 'number', required: true },
          { name: 'actual', type: 'number', required: false },
          { name: 'variance', type: 'number', required: false },
          { name: 'notes', type: 'text', required: false },
        ]},
        { name: 'Forecast', fields: [
          { name: 'period', type: 'text', required: true },
          { name: 'projectedRevenue', type: 'number', required: true },
          { name: 'projectedExpenses', type: 'number', required: true },
          { name: 'confidence', type: 'select', required: false },
          { name: 'assumptions', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'finance', 'department-head', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#2563eb',
      integrations: ['export'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow Tracker',
    description: 'Monitor cash inflows and outflows, projections, and bank reconciliation',
    features: ['Cash Flow', 'Projections', 'Bank Reconciliation', 'Categories', 'Reports'],
    category: 'Finance',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'reports', 'export', 'notifications'],
      targetUsers: ['accountant', 'cfo', 'admin'],
      entities: [
        { name: 'CashTransaction', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'category', type: 'select', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'bankAccount', type: 'text', required: true },
          { name: 'reference', type: 'text', required: false },
          { name: 'isReconciled', type: 'boolean', required: false },
        ]},
        { name: 'BankAccount', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'accountNumber', type: 'text', required: true },
          { name: 'bank', type: 'text', required: true },
          { name: 'balance', type: 'number', required: true },
          { name: 'currency', type: 'text', required: true },
          { name: 'lastReconciled', type: 'date', required: false },
        ]},
        { name: 'CashProjection', fields: [
          { name: 'period', type: 'text', required: true },
          { name: 'expectedInflow', type: 'number', required: true },
          { name: 'expectedOutflow', type: 'number', required: true },
          { name: 'netCash', type: 'number', required: true },
          { name: 'runningBalance', type: 'number', required: true },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'treasurer', 'accountant', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#0d9488',
      integrations: ['export'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  // ── Office ────────────────────────────────────────────────
  {
    id: 'purchase-requisition',
    name: 'Purchase Requisition',
    description: 'Internal purchase requests with multi-level approvals and PO generation',
    features: ['Requisitions', 'Approvals', 'PO Generation', 'Budget Check', 'Vendor Select'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Procurement',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'export'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Requisition', fields: [
          { name: 'reqNumber', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'department', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'urgency', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'requestedBy', type: 'text', required: true },
          { name: 'approvedBy', type: 'text', required: false },
        ]},
        { name: 'LineItem', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'quantity', type: 'number', required: true },
          { name: 'unitPrice', type: 'number', required: true },
          { name: 'preferredVendor', type: 'text', required: false },
          { name: 'glAccount', type: 'text', required: false },
        ]},
        { name: 'PurchaseOrder', fields: [
          { name: 'poNumber', type: 'text', required: true },
          { name: 'vendor', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'deliveryDate', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'requester', 'approver', 'procurement'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#ea580c',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'travel-reimbursement',
    name: 'Travel & Reimbursement',
    description: 'Travel requests, booking management, per diem, and reimbursement claims',
    features: ['Travel Requests', 'Bookings', 'Per Diem', 'Receipts', 'Reimbursement'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'export', 'reports'],
      targetUsers: ['employee', 'manager', 'admin'],
      entities: [
        { name: 'TravelRequest', fields: [
          { name: 'destination', type: 'text', required: true },
          { name: 'purpose', type: 'text', required: true },
          { name: 'departureDate', type: 'date', required: true },
          { name: 'returnDate', type: 'date', required: true },
          { name: 'estimatedCost', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'approvedBy', type: 'text', required: false },
        ]},
        { name: 'Booking', fields: [
          { name: 'type', type: 'select', required: true },
          { name: 'provider', type: 'text', required: true },
          { name: 'confirmationNumber', type: 'text', required: false },
          { name: 'cost', type: 'number', required: true },
          { name: 'date', type: 'date', required: true },
        ]},
        { name: 'Reimbursement', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'category', type: 'select', required: true },
          { name: 'receiptUrl', type: 'text', required: false },
          { name: 'date', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
      ],
      authMethods: ['email', 'google', 'microsoft'],
      roles: ['admin', 'manager', 'employee'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#0284c7',
      integrations: ['calendar', 'email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'time-attendance',
    name: 'Time & Attendance',
    description: 'Employee clock in/out, timesheets, overtime tracking, and leave management',
    features: ['Clock In/Out', 'Timesheets', 'Overtime', 'Leave Balances', 'Shift Planning'],
    category: 'Human Resources',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Human Resources',
      features: ['authentication', 'dashboard', 'notifications', 'reports', 'export'],
      targetUsers: ['employee', 'manager', 'admin'],
      entities: [
        { name: 'TimeEntry', fields: [
          { name: 'employee', type: 'text', required: true },
          { name: 'clockIn', type: 'date', required: true },
          { name: 'clockOut', type: 'date', required: false },
          { name: 'totalHours', type: 'number', required: false },
          { name: 'overtimeHours', type: 'number', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'notes', type: 'text', required: false },
        ]},
        { name: 'Shift', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'startTime', type: 'text', required: true },
          { name: 'endTime', type: 'text', required: true },
          { name: 'breakMinutes', type: 'number', required: false },
          { name: 'daysOfWeek', type: 'text', required: true },
        ]},
        { name: 'LeaveBalance', fields: [
          { name: 'employee', type: 'text', required: true },
          { name: 'leaveType', type: 'select', required: true },
          { name: 'totalDays', type: 'number', required: true },
          { name: 'usedDays', type: 'number', required: true },
          { name: 'remainingDays', type: 'number', required: true },
          { name: 'year', type: 'text', required: true },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'hr', 'manager', 'employee'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#e11d48',
      integrations: ['calendar', 'email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'fleet-management',
    name: 'Fleet Management',
    description: 'Company vehicles, mileage logs, maintenance schedules, and fuel tracking',
    features: ['Vehicles', 'Mileage Logs', 'Maintenance', 'Fuel Tracking', 'Assignments'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Facility Management',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'reports', 'export'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Vehicle', fields: [
          { name: 'licensePlate', type: 'text', required: true },
          { name: 'make', type: 'text', required: true },
          { name: 'model', type: 'text', required: true },
          { name: 'year', type: 'number', required: true },
          { name: 'mileage', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'assignedTo', type: 'text', required: false },
          { name: 'insuranceExpiry', type: 'date', required: false },
        ]},
        { name: 'MileageLog', fields: [
          { name: 'vehicle', type: 'text', required: true },
          { name: 'driver', type: 'text', required: true },
          { name: 'startMileage', type: 'number', required: true },
          { name: 'endMileage', type: 'number', required: true },
          { name: 'purpose', type: 'text', required: true },
          { name: 'date', type: 'date', required: true },
        ]},
        { name: 'MaintenanceRecord', fields: [
          { name: 'type', type: 'select', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'cost', type: 'number', required: true },
          { name: 'performedAt', type: 'date', required: true },
          { name: 'nextDue', type: 'date', required: false },
          { name: 'vendor', type: 'text', required: false },
        ]},
        { name: 'FuelEntry', fields: [
          { name: 'vehicle', type: 'text', required: true },
          { name: 'liters', type: 'number', required: true },
          { name: 'cost', type: 'number', required: true },
          { name: 'mileage', type: 'number', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'station', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'fleet-manager', 'driver'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#475569',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  // ── Product Management ──────────────────────────────────────
  {
    id: 'inventory',
    name: 'Inventory Manager',
    description: 'Track products, stock levels, warehouse locations, and purchase orders',
    features: ['Products', 'Stock', 'Locations', 'Purchase Orders', 'Alerts'],
    category: 'Operations',
    presetConfig: {
      appType: 'inventory',
      industry: 'Retail & E-commerce',
      features: ['authentication', 'dashboard', 'search', 'export', 'reports', 'notifications'],
      targetUsers: ['warehouse-staff', 'manager', 'admin'],
      entities: [
        { name: 'Product', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'sku', type: 'text', required: true },
          { name: 'price', type: 'number', required: true },
          { name: 'cost', type: 'number', required: false },
          { name: 'quantity', type: 'number', required: true },
          { name: 'reorderLevel', type: 'number', required: false },
        ]},
        { name: 'Location', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'address', type: 'text', required: false },
          { name: 'capacity', type: 'number', required: true },
        ]},
        { name: 'PurchaseOrder', fields: [
          { name: 'supplier', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'expectedDate', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'manager', 'staff'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#10b981',
      integrations: [],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog',
    description: 'Manage product listings, categories, pricing tiers, and media assets',
    features: ['Products', 'Categories', 'Variants', 'Pricing', 'Media Library'],
    category: 'Product Management',
    presetConfig: {
      appType: 'inventory',
      industry: 'Retail & E-commerce',
      features: ['authentication', 'dashboard', 'search', 'file-uploads', 'export'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Product', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'sku', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'basePrice', type: 'number', required: true },
          { name: 'category', type: 'text', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'Variant', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'sku', type: 'text', required: true },
          { name: 'price', type: 'number', required: true },
          { name: 'attributes', type: 'text', required: false },
          { name: 'stock', type: 'number', required: true },
        ]},
        { name: 'Category', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'slug', type: 'text', required: true },
          { name: 'parentCategory', type: 'text', required: false },
          { name: 'sortOrder', type: 'number', required: false },
        ]},
        { name: 'MediaAsset', fields: [
          { name: 'fileName', type: 'text', required: true },
          { name: 'url', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'altText', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'editor', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#f97316',
      integrations: ['cloudinary'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'order-management',
    name: 'Order Management',
    description: 'Process orders, manage fulfillment, handle returns, and track shipments',
    features: ['Orders', 'Fulfillment', 'Returns', 'Shipments', 'Customers'],
    category: 'Operations',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Retail & E-commerce',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'export', 'reports'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Order', fields: [
          { name: 'orderNumber', type: 'text', required: true },
          { name: 'customer', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'paymentStatus', type: 'select', required: true },
          { name: 'shippingAddress', type: 'text', required: true },
        ]},
        { name: 'OrderItem', fields: [
          { name: 'product', type: 'text', required: true },
          { name: 'quantity', type: 'number', required: true },
          { name: 'unitPrice', type: 'number', required: true },
        ]},
        { name: 'Shipment', fields: [
          { name: 'carrier', type: 'text', required: true },
          { name: 'trackingNumber', type: 'text', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'shippedAt', type: 'date', required: false },
          { name: 'deliveredAt', type: 'date', required: false },
        ]},
        { name: 'Return', fields: [
          { name: 'reason', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'refundAmount', type: 'number', required: false },
          { name: 'requestedAt', type: 'date', required: true },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'fulfillment', 'support'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#22c55e',
      integrations: ['email', 'stripe'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'supplier-portal',
    name: 'Supplier Portal',
    description: 'Manage suppliers, purchase orders, deliveries, and vendor evaluation',
    features: ['Suppliers', 'Purchase Orders', 'Deliveries', 'Evaluations', 'Documents'],
    category: 'Operations',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Supply Chain',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'export', 'reports'],
      targetUsers: ['both'],
      entities: [
        { name: 'Supplier', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'category', type: 'select', required: true },
          { name: 'rating', type: 'number', required: false },
          { name: 'paymentTerms', type: 'text', required: false },
        ]},
        { name: 'PurchaseOrder', fields: [
          { name: 'poNumber', type: 'text', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'deliveryDate', type: 'date', required: false },
        ]},
        { name: 'Delivery', fields: [
          { name: 'deliveryNote', type: 'text', required: true },
          { name: 'receivedAt', type: 'date', required: true },
          { name: 'qualityCheck', type: 'select', required: true },
          { name: 'notes', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'procurement', 'supplier'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#84cc16',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  // ── Project Management ──────────────────────────────────────
  {
    id: 'project-tracker',
    name: 'Project Tracker',
    description: 'Manage projects with tasks, milestones, time tracking, and team assignments',
    features: ['Projects', 'Tasks', 'Milestones', 'Time Tracking', 'Team'],
    category: 'Project Management',
    presetConfig: {
      appType: 'project',
      industry: 'Technology',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'comments', 'export'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Project', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'priority', type: 'select', required: true },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: false },
          { name: 'budget', type: 'number', required: false },
        ]},
        { name: 'Task', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'priority', type: 'select', required: true },
          { name: 'assignee', type: 'text', required: false },
          { name: 'dueDate', type: 'date', required: false },
          { name: 'estimatedHours', type: 'number', required: false },
        ]},
        { name: 'Milestone', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'TimeEntry', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'hours', type: 'number', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'billable', type: 'boolean', required: false },
        ]},
      ],
      authMethods: ['email', 'google', 'github'],
      roles: ['admin', 'manager', 'member'],
      layout: 'sidebar',
      theme: 'system',
      primaryColor: '#f59e0b',
      integrations: ['slack', 'calendar'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'bug-tracker',
    name: 'Bug Tracker',
    description: 'Track bugs, feature requests, and releases with priority management',
    features: ['Issues', 'Labels', 'Milestones', 'Releases', 'Comments'],
    category: 'Project Management',
    presetConfig: {
      appType: 'project',
      industry: 'Software Development',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'comments', 'export'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Issue', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'severity', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'assignee', type: 'text', required: false },
          { name: 'stepsToReproduce', type: 'text', required: false },
        ]},
        { name: 'Release', fields: [
          { name: 'version', type: 'text', required: true },
          { name: 'releaseDate', type: 'date', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'changelog', type: 'text', required: false },
        ]},
        { name: 'Comment', fields: [
          { name: 'content', type: 'text', required: true },
          { name: 'author', type: 'text', required: true },
        ]},
      ],
      authMethods: ['email', 'github'],
      roles: ['admin', 'developer', 'tester', 'reporter'],
      layout: 'sidebar',
      theme: 'dark',
      primaryColor: '#ef4444',
      integrations: ['slack'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'sprint-board',
    name: 'Sprint Board',
    description: 'Agile sprint planning with Kanban board, story points, and velocity tracking',
    features: ['Sprints', 'Kanban Board', 'Story Points', 'Velocity', 'Retrospectives'],
    category: 'Project Management',
    presetConfig: {
      appType: 'project',
      industry: 'Software Development',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'comments'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Sprint', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'goal', type: 'text', required: false },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'velocity', type: 'number', required: false },
        ]},
        { name: 'Story', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'status', type: 'select', required: true },
          { name: 'storyPoints', type: 'number', required: false },
          { name: 'assignee', type: 'text', required: false },
          { name: 'acceptanceCriteria', type: 'text', required: false },
        ]},
        { name: 'Retrospective', fields: [
          { name: 'wentWell', type: 'text', required: false },
          { name: 'toImprove', type: 'text', required: false },
          { name: 'actionItems', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'scrum-master', 'developer'],
      layout: 'sidebar',
      theme: 'system',
      primaryColor: '#3b82f6',
      integrations: ['slack', 'calendar'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'client-project',
    name: 'Client Projects',
    description: 'Manage client engagements with proposals, timesheets, and deliverables',
    features: ['Clients', 'Projects', 'Proposals', 'Timesheets', 'Invoicing'],
    category: 'Project Management',
    presetConfig: {
      appType: 'project',
      industry: 'Professional Services',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'export', 'reports'],
      targetUsers: ['both'],
      entities: [
        { name: 'Client', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'company', type: 'text', required: false },
          { name: 'industry', type: 'text', required: false },
        ]},
        { name: 'Project', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'budget', type: 'number', required: true },
          { name: 'startDate', type: 'date', required: true },
          { name: 'deadline', type: 'date', required: true },
        ]},
        { name: 'Timesheet', fields: [
          { name: 'description', type: 'text', required: true },
          { name: 'hours', type: 'number', required: true },
          { name: 'date', type: 'date', required: true },
          { name: 'rate', type: 'number', required: true },
          { name: 'billable', type: 'boolean', required: true },
        ]},
        { name: 'Deliverable', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'fileUrl', type: 'text', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'project-manager', 'consultant', 'client'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#8b5cf6',
      integrations: ['calendar', 'email', 'stripe'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
  {
    id: 'asset-management',
    name: 'IT Asset Manager',
    description: 'Track hardware, software licenses, assignments, and maintenance schedules',
    features: ['Assets', 'Licenses', 'Assignments', 'Maintenance', 'Reports'],
    category: 'Backoffice',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Information Technology',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'export', 'reports'],
      targetUsers: ['internal'],
      entities: [
        { name: 'Asset', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'type', type: 'select', required: true },
          { name: 'serialNumber', type: 'text', required: true },
          { name: 'purchaseDate', type: 'date', required: true },
          { name: 'purchasePrice', type: 'number', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'assignedTo', type: 'text', required: false },
        ]},
        { name: 'License', fields: [
          { name: 'software', type: 'text', required: true },
          { name: 'licenseKey', type: 'text', required: true },
          { name: 'seats', type: 'number', required: true },
          { name: 'usedSeats', type: 'number', required: false },
          { name: 'expiresAt', type: 'date', required: true },
          { name: 'cost', type: 'number', required: true },
        ]},
        { name: 'MaintenanceLog', fields: [
          { name: 'type', type: 'select', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'performedAt', type: 'date', required: true },
          { name: 'cost', type: 'number', required: false },
          { name: 'nextDue', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'microsoft'],
      roles: ['admin', 'it-manager', 'viewer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#64748b',
      integrations: ['email'],
      deployTarget: 'vercel',
      region: 'auto',
    },
  },
]

const categoryColors: Record<string, string> = {
  'Sales': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'Operations': 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  'Finance': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  'Project Management': 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  'Product Management': 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  'Human Resources': 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
  'Support': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  'Accounting': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  'Backoffice': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

// Stable category order
const CATEGORY_ORDER = [
  'Accounting',
  'Finance',
  'Human Resources',
  'Backoffice',
  'Operations',
  'Sales',
  'Support',
  'Project Management',
  'Product Management',
] as const

export default function TemplatesPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { addToast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Derive category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const tmpl of templates) {
      counts[tmpl.category] = (counts[tmpl.category] || 0) + 1
    }
    return counts
  }, [])

  // Ordered categories that actually have templates
  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => categoryCounts[c]),
    [categoryCounts],
  )

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = templates
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.features.some((f) => f.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q),
      )
    }
    return result
  }, [activeCategory, searchQuery])

  const handleCloseModal = () => {
    setSelectedTemplate(null)
    setProjectName('')
  }

  const handleUseTemplate = async () => {
    if (!selectedTemplate || !projectName) return

    setIsCreating(true)

    const config = {
      businessName: projectName,
      description: selectedTemplate.description,
      ...selectedTemplate.presetConfig,
      customFeatures: '',
    } as Record<string, unknown>

    const result = await savePresetConfig(null, config)

    if (result.error) {
      setIsCreating(false)
      addToast({
        type: 'error',
        title: 'Failed to create project',
        description: result.error,
      })
      return
    }

    addToast({
      type: 'success',
      title: 'Project created',
      description: `${projectName} has been created from the ${selectedTemplate.name} template`,
    })

    // Navigate to Combo Dude with the new project
    router.push(`/dashboard/pipeline/combo?project=${result.projectId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('templates.title')}</h2>
          <p className="text-muted-foreground">
            {t('templates.subtitle')}
          </p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {filteredTemplates.length} / {templates.length} {t('templates.title').toLowerCase()}
        </p>
      </div>

      {/* Search + Category Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('templates.searchPlaceholder')}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            {t('templates.allCategories')}
            <span className="ml-0.5 tabular-nums">({templates.length})</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : `${categoryColors[cat]} hover:opacity-80`
              }`}
            >
              {cat}
              <span className="tabular-nums">({categoryCounts[cat]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">{t('templates.noResults')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('templates.noResultsHint')}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => { setActiveCategory(null); setSearchQuery('') }}
          >
            {t('templates.clearFilters')}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[template.category]}`}>
                    {template.category}
                  </span>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{template.presetConfig.entities?.length || 0} {t('templates.dataModels')}</p>
                  <p>{template.presetConfig.features?.length || 0} {t('templates.includes')}</p>
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  {t('templates.preview')}
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTemplate(template)
                    setProjectName(template.name)
                  }}
                >
                  <Sparkles className="mr-1 h-4 w-4" />
                  Use
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Template Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              {/* Category badge */}
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${categoryColors[selectedTemplate.category]}`}>
                {selectedTemplate.category}
              </span>

              {/* Features */}
              <div>
                <p className="text-sm font-medium mb-2">{t('templates.features')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.presetConfig.features?.map((f) => (
                    <span key={f} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Models */}
              <div>
                <p className="text-sm font-medium mb-2">{t('templates.dataModels')}</p>
                <div className="space-y-2">
                  {selectedTemplate.presetConfig.entities?.map((entity) => (
                    <div key={entity.name} className="rounded border p-3">
                      <p className="font-medium text-sm">{entity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {entity.fields.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Name Input */}
              <div className="border-t pt-4">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name"
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleUseTemplate}
              disabled={!projectName || isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  {t('templates.useTemplate')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
