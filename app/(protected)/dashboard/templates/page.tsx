'use client'

import { useState } from 'react'
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
import { FileCode, ArrowRight, Sparkles, Eye, Check, Loader2 } from 'lucide-react'
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
  'Backoffice': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export default function TemplatesPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { addToast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

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
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('templates.title')}</h2>
        <p className="text-muted-foreground">
          {t('templates.subtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
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

      {/* Template Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
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
