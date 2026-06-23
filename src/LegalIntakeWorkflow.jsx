import React, { useState } from 'react';
import { ChevronDown, Phone, Mail, MessageSquare } from 'lucide-react';

const LegalIntakeWorkflow = () => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedBranch, setExpandedBranch] = useState(null);

  const phases = [
    {
      id: 'phase1',
      number: 1,
      label: 'PHASE 1',
      title: 'Inbound Response & First Contact',
      color: 'bg-teal-600',
      textColor: 'text-teal-700',
      steps: [
        {
          id: 'inbound',
          title: 'Inbound Call Handling',
          subtitle: 'Answer within <20 sec, professional greeting, consent scripting',
          description:
            'The Legal Intake Specialist is the first point of contact for prospective clients responding to legal marketing campaigns. Every inbound call must be answered quickly, with professional brand representation, and call-recording consent obtained before the intake begins.',
          activities: [
            'Answer inbound calls within the 20-second Speed to Answer (ASA) target',
            'Deliver professional, empathetic opening greeting representing the client\'s brand',
            'Execute call-recording consent scripting at the start of every call',
            'Confirm caller language preference — English or bilingual Spanish seat',
            'Verify basic caller identity and campaign source for tracking',
            'Set a calm, professional tone that builds immediate trust with the caller',
          ],
          kpi: 'Speed to Answer (ASA) < 20 sec | Call Abandonment Rate < 5%',
          bottlenecks: [
            'Peak call volume periods exceeding staffing coverage',
            'Staggered shift gaps leaving calls unanswered during transition',
            'Language mismatches when bilingual seats are unavailable',
          ],
          supportChannels: ['inbound'],
          channelDescription: 'Inbound calls exclusively — prospective clients responding to legal marketing campaigns.',
        },
      ],
    },
    {
      id: 'phase2',
      number: 2,
      label: 'PHASE 2',
      title: 'Intake Interview & Lead Qualification',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      steps: [
        {
          id: 'qualification',
          title: 'Intake Interview & Qualification',
          subtitle: 'Script-based intake, gather case facts, apply firm qualification criteria',
          description:
            'The specialist conducts a thorough, structured intake conversation using firm-approved scripts and qualification forms. All key information — caller identity, incident details, timeline, and eligibility indicators — is gathered and assessed against the firm\'s specific criteria.',
          activities: [
            'Conduct structured intake conversation using approved scripts, forms, and qualification criteria',
            'Gather complete caller contact information, incident facts, and timeline',
            'Apply firm-specific qualification criteria to assess case eligibility',
            'Identify and document eligibility indicators, red flags, and disqualifiers',
            'Maintain empathetic, human tone while adhering to script structure',
            'Document simultaneously with speaking — 40+ WPM concurrent data entry',
            'Flag any unusual, complex, or unclear case facts for supervisor review',
          ],
          kpi: 'Lead Qualification Accuracy ≥ 95% | Intake Completion Accuracy ≥ 95%',
          bottlenecks: [
            'Complex or ambiguous case facts that require attorney input before qualifying',
            'Emotional or distressed callers requiring extended empathy handling',
            'Callers with limited English when bilingual seat is unavailable',
            'Incomplete or inconsistent caller-provided information',
          ],
          supportChannels: ['inbound'],
          channelDescription:
            'Inbound calls. All qualification occurs during the live intake conversation.',
          branches: [
            {
              id: 'qualified',
              title: 'Qualified Lead — Advance to Documentation',
              subtitle: 'Lead meets firm criteria; complete CRM entry and route to attorney',
              description:
                'The caller\'s case meets the firm\'s qualification criteria. The specialist completes all required documentation and advances the lead through the routing workflow.',
              activities: [
                'Confirm all required intake fields are fully and accurately completed',
                'Assign lead status as "Qualified" in the CRM',
                'Communicate next steps to the caller and set clear expectations',
                'Route lead record to the appropriate attorney or case team',
                'Create any required follow-up tasks in the CRM',
              ],
              kpi: 'Intake Completion Accuracy ≥ 95%',
              supportChannels: ['inbound', 'email'],
              channelDescription: 'Inbound call. CRM and email used for internal routing.',
            },
            {
              id: 'unqualified',
              title: 'Unqualified Lead — Document & Close',
              subtitle: 'Lead does not meet criteria; empathetic decline and documentation',
              description:
                'The caller\'s case does not meet the firm\'s qualification criteria. The specialist communicates this professionally and documents the disqualification accurately.',
              activities: [
                'Communicate disqualification empathetically using approved scripting',
                'Document the disqualification reason clearly in the CRM',
                'Provide referral information if permitted and applicable per firm policy',
                'Close the call professionally, maintaining brand consistency throughout',
              ],
              supportChannels: ['inbound'],
              channelDescription: 'Inbound call. No further outreach required for disqualified leads.',
            },
          ],
        },
      ],
    },
    {
      id: 'phase3',
      number: 3,
      label: 'PHASE 3',
      title: 'CRM Documentation & Record Quality',
      color: 'bg-green-600',
      textColor: 'text-green-700',
      steps: [
        {
          id: 'crm',
          title: 'CRM Data Entry & Documentation',
          subtitle: 'Complete, accurate entry into Lead Docket, Filevine, CloudLex, Litify, or HubSpot',
          description:
            'All intake details must be entered completely, clearly, and accurately into the assigned CRM or case management platform during or immediately after every call. Documentation quality is a core KPI and directly impacts case progression and firm confidence.',
          activities: [
            'Enter all intake details into the assigned platform (Lead Docket, Filevine, CloudLex, Litify, HubSpot, or client-specified)',
            'Document caller info, case facts, timeline, eligibility determination, and assigned lead status',
            'Attach relevant notes, special flags, or attorney instructions to the record',
            'Update lead status and assign follow-up tasks per firm workflow requirements',
            'Review entry for completeness and accuracy before advancing to routing',
            'Meet or exceed the ≥ 95% CRM Documentation Quality target on every record',
          ],
          kpi: 'CRM Documentation Quality ≥ 95% | Intake Completion Accuracy ≥ 95%',
          bottlenecks: [
            'High after-call work (ACW) volume during peak periods',
            'Platform inconsistencies across different client CRM systems',
            'Insufficient time between back-to-back calls for thorough documentation',
          ],
          supportChannels: ['email'],
          channelDescription:
            'Internal process — CRM platform and email used for record entry, follow-up task assignment, and internal communication.',
        },
      ],
    },
    {
      id: 'phase4',
      number: 4,
      label: 'PHASE 4',
      title: 'Lead Routing & Escalation',
      color: 'bg-violet-600',
      textColor: 'text-violet-700',
      steps: [
        {
          id: 'routing',
          title: 'Lead Routing & Priority Escalation',
          subtitle: 'Route qualified leads, escalate urgent cases per firm SOP',
          description:
            'Once documentation is complete, leads are routed per client-specific workflow. Urgent, high-priority, or sensitive inquiries — such as statute of limitations risks or medical emergencies — are identified immediately and escalated following established escalation paths.',
          activities: [
            'Route qualified leads to the designated attorney, case team, or intake manager per firm SOP',
            'Identify urgent, high-priority, or sensitive cases requiring immediate escalation',
            'Execute escalation path for time-sensitive situations (SOL risk, medical emergency, media exposure)',
            'Confirm handoff with the receiving party and document routing decision in CRM',
            'Track all follow-up tasks created during the routing step',
            'Maintain escalation accuracy at or above the ≥ 98% target',
          ],
          kpi: 'Escalation Accuracy ≥ 98%',
          bottlenecks: [
            'Attorney or supervisor unavailability during urgent escalations',
            'Ambiguous escalation criteria for edge cases not covered in SOP',
            'Routing errors when multiple campaigns run simultaneously with different workflows',
          ],
          supportChannels: ['inbound', 'email'],
          channelDescription:
            'Inbound warm transfers for immediate escalation. Email for standard handoff notification and documentation.',
          branches: [
            {
              id: 'standard-handoff',
              title: 'Standard Lead Handoff',
              subtitle: 'Qualified lead routed to assigned attorney or case team',
              description:
                'Routine qualified leads are transferred to the assigned attorney or intake team following the firm\'s standard routing protocol.',
              activities: [
                'Confirm attorney or case team availability for lead handoff',
                'Transfer full lead record with complete documentation attached',
                'Notify receiving party of case assignment via CRM or email',
                'Document handoff completion and timestamp in the case record',
              ],
              supportChannels: ['email'],
              channelDescription: 'Email notification and CRM record transfer for standard handoffs.',
            },
            {
              id: 'urgent-escalation',
              title: 'Urgent Escalation Path',
              subtitle: 'Immediate escalation for high-priority or time-sensitive cases',
              description:
                'Cases triggering escalation criteria — statute of limitations risk, medical emergency, high-value claim, or attorney-flagged scenarios — are escalated immediately outside the standard routing flow.',
              activities: [
                'Identify escalation triggers: SOL risk, medical emergency, media exposure, high-value claim',
                'Immediately notify the on-call supervisor or designated escalation contact',
                'Document escalation reason, time, and actions taken in CRM',
                'Follow up to confirm escalation was received and acted upon',
                'Close the escalation loop with a status update in the case record',
              ],
              kpi: 'Escalation Accuracy ≥ 98%',
              supportChannels: ['inbound', 'email'],
              channelDescription:
                'Live warm transfer to on-call attorney or supervisor. Email escalation note for documentation.',
            },
          ],
        },
      ],
    },
    {
      id: 'phase5',
      number: 5,
      label: 'PHASE 5',
      title: 'Follow-up & Retainer Conversion',
      color: 'bg-amber-600',
      textColor: 'text-amber-700',
      steps: [
        {
          id: 'followup',
          title: 'Follow-up & Retainer Conversion',
          subtitle: 'Outbound calls, voicemail, email follow-ups — convert qualified leads to retained clients',
          description:
            'Specialists support all post-intake follow-up activities to maximize conversion of qualified leads into signed, retained clients. This includes outbound callback attempts, professional voicemail messages, email status updates, and coordination with the firm\'s conversion workflow.',
          activities: [
            'Conduct outbound follow-up calls to qualified leads who did not convert on initial contact',
            'Leave professional, on-brand voicemail messages using approved scripting',
            'Send follow-up emails and status updates per firm workflow and TCPA-compliant timing',
            'Track all follow-up touchpoints in CRM and update lead status after each contact attempt',
            'Support retainer/signing conversion per campaign goals and specialist capacity',
            'Monitor follow-up completion rate and maintain ≥ 95% target',
            'Observe TCPA-aware practices on all outbound and follow-up call activity',
          ],
          kpi: 'Follow-up Completion ≥ 95% | Conversion / Retainer Rate: Per campaign',
          bottlenecks: [
            'Low contact rates — busy lines, no-answers, disconnected numbers',
            'Callers who become unresponsive or change their mind after initial intake',
            'TCPA restrictions limiting outbound timing windows',
            'CRM follow-up task overload during high-volume campaign periods',
          ],
          supportChannels: ['outbound', 'voicemail', 'email'],
          channelDescription:
            'Outbound calls to qualified leads. Voicemail follow-ups when callers are unreachable. Email follow-ups and status updates per firm workflow.',
        },
      ],
    },
    {
      id: 'phase6',
      number: 6,
      label: 'CROSS-FUNCTIONAL',
      title: 'Compliance, QA & Performance Management',
      color: 'bg-slate-600',
      textColor: 'text-slate-700',
      steps: [
        {
          id: 'compliance',
          title: 'Compliance, QA & Performance',
          subtitle: 'HIPAA / TCPA compliance, QA scoring, KPI tracking — active across all phases',
          description:
            'Compliance and quality assurance are active throughout all workflow phases. All specialists must adhere to HIPAA-aligned practices for medical information, TCPA-aware practices on outbound calls, and participate in regular QA evaluations, coaching sessions, and calibration.',
          activities: [
            'Apply HIPAA-aligned practices when capturing or discussing medical details on injury/mass-tort campaigns',
            'Observe TCPA-aware practices on all outbound and follow-up call activity',
            'Follow call-recording consent scripting on every call, without exception',
            'Handle all PII/PHI per the signed confidentiality/NDA agreement',
            'Participate in QA call evaluations, coaching sessions, and calibration reviews',
            'Review own performance metrics and respond to QA feedback proactively',
            'Maintain attendance and schedule adherence at or above the ≥ 95% target',
            'Adapt quickly to new campaigns, case types, systems, and SOP updates',
          ],
          kpi: 'QA Score ≥ 90% | Attendance & Schedule Adherence ≥ 95%',
          bottlenecks: [
            'Rapid campaign changes requiring fast retraining without production dips',
            'Balancing call volume targets with thorough QA compliance',
          ],
          supportChannels: [],
          channelDescription:
            'No direct client-facing channel — internal QA, coaching, and compliance process active across all phases.',
          scorecard: [
            { metric: 'Speed to Answer (ASA)', category: 'Telephony', target: '< 20 sec', weight: 'Tier 1' },
            { metric: 'Call Abandonment Rate', category: 'Telephony', target: '< 5%', weight: 'Tier 1' },
            { metric: 'Average Handle Time (AHT)', category: 'Telephony', target: 'Per campaign', weight: 'Tier 2' },
            { metric: 'Intake Completion Accuracy', category: 'CRM / Intake', target: '≥ 95%', weight: 'Tier 1' },
            { metric: 'Lead Qualification Accuracy', category: 'CRM / Intake', target: '≥ 95%', weight: 'Tier 1' },
            { metric: 'CRM Documentation Quality', category: 'CRM / Intake', target: '≥ 95%', weight: 'Tier 1' },
            { metric: 'Escalation Accuracy', category: 'Routing', target: '≥ 98%', weight: 'Tier 1' },
            { metric: 'Follow-up Completion', category: 'Follow-up', target: '≥ 95%', weight: 'Tier 1' },
            { metric: 'Conversion / Retainer Rate', category: 'Conversion', target: 'Per campaign', weight: 'Tier 1' },
            { metric: 'QA Score', category: 'Quality', target: '≥ 90%', weight: 'Tier 1' },
            { metric: 'Occupancy / Utilization', category: 'Performance', target: 'Per campaign', weight: 'Tier 2' },
            { metric: 'Attendance & Schedule Adherence', category: 'Operations', target: '≥ 95%', weight: 'Tier 1' },
          ],
        },
      ],
    },
  ];

  const channelTypes = [
    { value: 'inbound', label: 'Inbound Call', icon: Phone, color: 'bg-blue-100 border-blue-300 text-blue-900' },
    { value: 'outbound', label: 'Outbound Call', icon: Phone, color: 'bg-green-100 border-green-300 text-green-900' },
    { value: 'email', label: 'Email', icon: Mail, color: 'bg-yellow-100 border-yellow-300 text-yellow-900' },
    { value: 'sms', label: 'SMS', icon: MessageSquare, color: 'bg-purple-100 border-purple-300 text-purple-900' },
    { value: 'voicemail', label: 'Voicemail', icon: MessageSquare, color: 'bg-red-100 border-red-300 text-red-900' },
  ];

  const getChannelDisplay = (type) => channelTypes.find((ch) => ch.value === type);

  const toggleBranch = (branchId) => {
    setExpandedBranch(expandedBranch === branchId ? null : branchId);
  };

  const ChannelBadges = ({ channels }) => (
    <div className="flex flex-wrap gap-2">
      {channels.length === 0 ? (
        <span className="text-xs text-slate-500 italic">No contact channels</span>
      ) : (
        channels.map((channelType) => {
          const ch = getChannelDisplay(channelType);
          if (!ch) return null;
          const Icon = ch.icon;
          return (
            <span
              key={channelType}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border ${ch.color}`}
            >
              <Icon size={14} />
              {ch.label}
            </span>
          );
        })
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-lg">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">Legal Intake</h1>
              <h2 className="text-2xl font-light text-slate-600 mt-2">Specialist Workflow</h2>
              <p className="text-slate-500 mt-3 text-base">
                Inbound response • Intake &amp; qualification • CRM documentation • Routing • Follow-up &amp; conversion
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-600 via-blue-600 via-green-600 via-violet-600 via-amber-600 to-slate-600 rounded-full"></div>

          <div className="space-y-12 relative">
            {phases.map((phase, index) => {
              const isCrossFunctional = index === 5;
              return (
                <React.Fragment key={phase.id}>
                  {isCrossFunctional && (
                    <div className="pl-32 mb-12">
                      <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-2">All Phases</p>
                      <h2 className="text-3xl font-bold text-slate-900 mt-1">Cross-Functional Support</h2>
                    </div>
                  )}
                  <div className="pl-32">
                    {!isCrossFunctional && (
                      <div className="mb-6">
                        <p className={`text-xs font-bold tracking-widest uppercase ${phase.textColor}`}>{phase.label}</p>
                        <h2 className="text-3xl font-bold text-slate-900 mt-1">{phase.title}</h2>
                      </div>
                    )}

                    <div className="space-y-4">
                      {phase.steps.map((step) => {
                        const isExpanded = expandedStep === step.id;
                        return (
                          <div key={step.id} className="flex gap-4 items-start">
                            <div className="flex-1">
                              {/* Step button */}
                              <button
                                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                                className={`w-full p-5 rounded-xl text-white font-bold flex items-center justify-between transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 ${phase.color} ${isExpanded ? 'shadow-lg -translate-y-1' : 'shadow-md'}`}
                              >
                                <div className="text-left">
                                  <h3 className="text-lg">{step.title}</h3>
                                  <p className="text-sm opacity-85 font-normal mt-1">{step.subtitle}</p>
                                </div>
                                <ChevronDown
                                  size={24}
                                  className={`transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {/* Expanded content */}
                              {isExpanded && (
                                <div className="mt-3 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-md space-y-6">
                                  <p className="text-slate-700 leading-relaxed text-base">{step.description}</p>

                                  {/* Key Activities */}
                                  <div>
                                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                                      Key Activities
                                    </h4>
                                    <ul className="space-y-2">
                                      {step.activities.map((activity, i) => (
                                        <li key={i} className="text-sm text-slate-700 flex gap-3">
                                          <span className={`font-bold flex-shrink-0 mt-0.5 ${phase.textColor}`}>✓</span>
                                          {activity}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* KPI */}
                                  {step.kpi && (
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                                      <p className="text-sm">
                                        <span className="font-bold text-blue-900">📊 KPI: </span>
                                        <span className="text-blue-800">{step.kpi}</span>
                                      </p>
                                    </div>
                                  )}


                                  {/* Scorecard */}
                                  {step.scorecard && (
                                    <div>
                                      <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                                        Full KPI Scorecard
                                      </h4>
                                      <div className="overflow-x-auto">
                                        <table className="w-full text-xs border-collapse">
                                          <thead>
                                            <tr className="border-b-2 border-slate-300 bg-slate-100">
                                              <th className="text-left p-3 font-bold text-slate-900">KPI</th>
                                              <th className="text-left p-3 font-bold text-slate-900">Category</th>
                                              <th className="text-left p-3 font-bold text-slate-900">Target</th>
                                              <th className="text-left p-3 font-bold text-slate-900">Tier</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {step.scorecard.map((row, i) => (
                                              <tr
                                                key={i}
                                                className="border-b border-slate-200 hover:bg-white transition-colors"
                                              >
                                                <td className="p-3 text-slate-700 font-medium">{row.metric}</td>
                                                <td className="p-3 text-slate-600">{row.category}</td>
                                                <td className="p-3 text-slate-700 font-bold">{row.target}</td>
                                                <td className="p-3">
                                                  <span
                                                    className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${
                                                      row.weight === 'Tier 1'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                    }`}
                                                  >
                                                    {row.weight}
                                                  </span>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  )}

                                  {/* Branches */}
                                  {step.branches && step.branches.length > 0 && (
                                    <div className="mt-6 pt-6 border-t-2 border-slate-300">
                                      <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                                        📌 Branch Operations
                                      </h4>
                                      <div className="space-y-3">
                                        {step.branches.map((branch) => (
                                          <div key={branch.id}>
                                            <button
                                              onClick={() =>
                                                toggleBranch(expandedBranch === branch.id ? null : branch.id)
                                              }
                                              className="w-full p-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center justify-between transition-all hover:shadow-lg"
                                            >
                                              <div className="text-left">
                                                <h5 className="font-bold">{branch.title}</h5>
                                                <p className="text-xs opacity-85 font-normal mt-0.5">{branch.subtitle}</p>
                                              </div>
                                              <ChevronDown
                                                size={20}
                                                className={`transition-transform flex-shrink-0 ${
                                                  expandedBranch === branch.id ? 'rotate-180' : ''
                                                }`}
                                              />
                                            </button>

                                            {expandedBranch === branch.id && (
                                              <div className="mt-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200 space-y-4">
                                                <p className="text-slate-700 text-sm">{branch.description}</p>
                                                <div>
                                                  <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wide">
                                                    Key Activities
                                                  </h4>
                                                  <ul className="space-y-1">
                                                    {branch.activities.map((activity, i) => (
                                                      <li key={i} className="text-sm text-slate-700 flex gap-2">
                                                        <span className="text-orange-600 font-bold">✓</span>
                                                        {activity}
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                                {branch.kpi && (
                                                  <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                                                    <p className="text-sm">
                                                      <span className="font-bold text-blue-900">📊 KPI: </span>
                                                      <span className="text-blue-800">{branch.kpi}</span>
                                                    </p>
                                                  </div>
                                                )}
                                                {branch.supportChannels && branch.supportChannels.length > 0 && (
                                                  <div>
                                                    <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wide">
                                                      Channels
                                                    </h4>
                                                    <ChannelBadges channels={branch.supportChannels} />
                                                    {branch.channelDescription && (
                                                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                                        {branch.channelDescription}
                                                      </p>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Channel panel */}
                            <div className="w-80 flex-shrink-0">
                              <button
                                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                                className={`w-full p-5 rounded-xl text-white font-bold flex items-center justify-between transition-all duration-300 ease-out shadow-md ${phase.color} ${isExpanded ? 'shadow-lg -translate-y-1' : ''}`}
                              >
                                <div className="text-left">
                                  <h3 className="text-sm opacity-90">Available</h3>
                                  <p className="text-xs opacity-75 font-normal mt-0.5">Channels</p>
                                </div>
                                <ChevronDown
                                  size={20}
                                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {isExpanded && (
                                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-md space-y-3">
                                  <ChannelBadges channels={step.supportChannels} />
                                  {step.channelDescription && (
                                    <p className="text-xs text-slate-600 leading-relaxed">{step.channelDescription}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Footer compliance note */}
        <div className="mt-16 p-6 bg-slate-100 rounded-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Compliance Reminder</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            All intake activity captures PII and, for personal-injury/mass-tort campaigns, PHI. Specialists must
            complete HIPAA-aligned and data-privacy training during onboarding, follow TCPA-aware practices on all
            outbound activity, apply call-recording consent scripting on every call, and maintain the signed
            confidentiality / NDA agreement at all times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalIntakeWorkflow;
