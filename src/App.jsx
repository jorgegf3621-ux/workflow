import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MessageCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import './index.css';

const GeminiWorkflowApp = () => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedBranch, setExpandedBranch] = useState(null);
  const [selectedStepForPanel, setSelectedStepForPanel] = useState(null);
  const [ballPosition, setBallPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [autoExpandStep, setAutoExpandStep] = useState(null);
  const timelineRef = useRef(null);
  const ballRef = useRef(null);
  const stepsRef = useRef({});

  const phases = [
    {
      id: 'phase1',
      number: 1,
      label: 'PHASE 1',
      title: 'Case Initiation & Records',
      color: 'bg-teal-600',
      textColor: 'text-teal-700',
      steps: [
        {
          id: 'uos',
          title: 'UOS — Unique Order Specialist',
          subtitle: 'Sends SNOL to employer, address research, delivery follow-up',
          description: 'The Unique Order Specialist initiates each case by sending the SNOL to the employer, conducting address research, and investigating any delivery failures to ensure effective communication and case management.',
          activities: [
            'Send SNOL (Service Notice of Lawsuit) to the employer',
            'Conduct address research to verify employer contact information',
            'Investigate and resolve any delivery failures',
            'Ensure effective communication for case initiation',
          ],
          kpi: '> 30 cases reviewed per day',
          bottlenecks: [
            'Incorrect or outdated employer addresses',
            'Failed SNOL deliveries, causing delays in case initiation',
          ],
          supportChannels: ['email'],
          channelDescription: 'Contact is maintained exclusively through SNOL documents sent via email to employers.',
        },
        {
          id: 'rr',
          title: 'Record Retrieval',
          subtitle: 'Obtains medical records from providers, generates copy fees',
          description: 'In this phase, the team efficiently obtains essential records from various locations, such as workplaces and hospitals.',
          activities: [
            'Obtain essential records from workplaces, hospitals, and other providers',
            'Collect all necessary documentation to support the case',
            'Generate copy fees for records obtained',
            'Track and follow up on pending record requests',
          ],
          kpi: '50 cases processed per day',
          bottlenecks: [
            'Difficulty reaching the correct contacts at hospitals and employers due to long hold times and transfers',
            'Inconsistent document formats and missing documentation from providers',
          ],
          supportChannels: ['outbound', 'inbound'],
          channelDescription: '80% outbound calls to locations: medical centers, pharmacies, and IW workplaces (restaurants, etc.). Inbound calls from locations with questions about document submission — where to send records, why they are required, and how to submit them.',
        },
        {
          id: 'edr',
          title: 'EDR — Early Dispute Resolution',
          subtitle: 'Sends invoices for copy service fees to insurance carriers',
          description: 'EDR operates between Record Retrieval steps, sending invoices for copy service fees directly to insurance carriers for records obtained.',
          activities: [
            'Send invoices for copy service fees to insurance carriers',
            'Ensure accurate billing for records obtained',
            'Track invoice status and follow up on pending submissions',
            'Resolve any billing disputes with carriers',
          ],
          kpi: '> 35 cases processed per day',
          bottlenecks: [],
          supportChannels: ['outbound'],
          channelDescription: 'Outbound calls to insurance carriers to send and follow up on copy service fee invoices.',
        },
        {
          id: 'rrv',
          title: 'Record Review',
          subtitle: 'Reviews records for accuracy, flags CNR if no records found',
          description: 'In this critical phase, all obtained records are meticulously reviewed for accuracy and relevance.',
          activities: [
            'Review all obtained records for accuracy and relevance',
            'Cross-reference records with case requirements',
            'Route cases to appropriate branch: CNR or Record Resolution',
            'Ensure quality and completeness before advancing the case',
          ],
          kpi: '75 cases reviewed per day',
          bottlenecks: [
            'Manual review process can be time-consuming, especially with high-volume caseloads',
            'High volume impacts turnaround times',
          ],
          supportChannels: [],
          channelDescription: 'No contact channels at this time — internal review process only.',
          branches: [
            {
              id: 'cnr',
              title: 'CNR — Certificate of No Records',
              subtitle: 'Verifies cases where providers have no records',
              description: 'This branch handles cases flagged by Record Review to verify and confirm that no records exist from the provider.',
              activities: [
                'Verify cases flagged by Record Review for CNR designation',
                'Confirm that no records exist from the provider',
                'Maintain the integrity of the legal process',
                'Document CNR verification in the case file',
              ],
              kpi: '45 cases verified per day',
              supportChannels: [],
              channelDescription: 'No contact channels',
            },
            {
              id: 'rres',
              title: 'Record Resolution',
              subtitle: 'Resolves discrepancies and completes record processing',
              description: 'This branch handles cases that require further resolution after Record Review.',
              activities: [
                'Resolve discrepancies found during record review',
                'Obtain missing or incomplete information from providers',
                'Finalize record documentation for case progression',
                'Coordinate with Record Retrieval for additional records if needed',
              ],
              kpi: 'Department-specific target',
              supportChannels: [],
              channelDescription: 'No contact channels',
            },
          ],
        },
      ],
    },
    {
      id: 'phase2',
      number: 2,
      label: 'PHASE 2',
      title: 'Case Processing & Resolution',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      steps: [
        {
          id: 'intake',
          title: 'Intake',
          subtitle: 'Receives cases, assigns to specialists, routes calls',
          description: 'The Intake department manages the flow of new cases into the voucher phase through specialized branches.',
          activities: [
            'Manage referrals from external law firms through counselors',
            'Process and assign cases to Case Specialists with daily caps',
          ],
          kpi: 'Department-specific targets',
          supportChannels: ['inbound', 'email'],
          channelDescription: 'Receives calls and emails from law offices and counselors',
          branches: [
            {
              id: 'intake-counselors',
              title: 'Intake — Counselors',
              subtitle: 'Maintain contact with law firms and receive referrals',
              description: 'Counselors serve as the primary liaison with law firms.',
              activities: [
                'Maintain ongoing contact with external law firms',
                'Receive and process case referrals',
                'Ensure all referral documentation is complete',
                'Coordinate with law firms on case requirements',
              ],
              supportChannels: ['email', 'inbound'],
              channelDescription: 'Receive inbound calls and emails from law offices regarding case referrals.',
            },
            {
              id: 'intake-assignment',
              title: 'Intake — Case Assignment',
              subtitle: 'Reviews cases from counselors, enters to CRM, assigns to specialists',
              description: 'This branch reviews the cases that counselors send via email and assigns cases to Case Specialists.',
              activities: [
                'Review cases sent by counselors via email',
                'Enter and validate case information in the CRM',
                'Assign cases to Case Specialists (cap: 5 new cases/day per specialist)',
                'Monitor specialist capacity and distribute cases accordingly',
              ],
              kpi: 'Assign cases as quickly as possible — minimize assignment delay',
              supportChannels: ['email', 'inbound'],
              channelDescription: 'Receive inbound calls and emails from law offices with new case information. Reviews and enters cases into CRM, then assigns to available Case Specialists.',
            },
          ],
        },
      ],
    },
    {
      id: 'phase3',
      number: 3,
      label: 'PHASE 3',
      title: 'Vouchers — Backlog target: below 25 cases per specialist',
      color: 'bg-green-600',
      textColor: 'text-green-700',
      steps: [
        {
          id: 'vouchersp',
          title: 'Voucher Signing Process',
          subtitle: 'Handles voucher signing directly with clients',
          description: 'In this step, the team handles the voucher signing directly with clients.',
          activities: [
            'Sign vouchers directly with clients',
            'Ensure clients understand the Supplemental Job Displacement benefit',
            'Formalize claims for timely processing',
            'Manage ongoing client communication throughout the process',
          ],
          supportChannels: ['inbound', 'outbound', 'email', 'sms'],
          channelDescription: 'Inbound calls from injured workers. Outbound calls to insurance carriers, adjusters, schools, and injured workers. Email communication with all parties. Inbound & outbound SMS with injured workers.',
          scorecard: [
            { metric: 'Outbound Calls', category: 'Zoom', target: '> 345', weight: '10%' },
            { metric: 'Backlog #', category: 'Zoom', target: '< 25', weight: '20%' },
            { metric: 'Invoicing', category: 'OS', target: '> 40', weight: '16%' },
            { metric: 'RTW Hold', category: 'OS', target: '< 5', weight: '10%' },
            { metric: 'TAT', category: 'OS', target: '< 25', weight: '9%' },
            { metric: 'Messages Sent', category: 'Front Analytics', target: '> 200', weight: '7%' },
            { metric: 'Reply Time (Avg)', category: 'Front Analytics', target: '< 24', weight: '7%' },
            { metric: 'Quality Assurance #', category: 'QA', target: '< 3', weight: '10%' },
            { metric: 'Escalations #', category: 'QA', target: '< 1', weight: '11%' },
          ],
          branches: [
            {
              id: 'cs-vouchers',
              title: 'Case Specialist — Vouchers',
              subtitle: 'Follow-up and management of voucher cases with clients',
              description: 'Case Specialists in the voucher phase provide ongoing follow-up with clients.',
              activities: [
                'Follow up with clients on voucher signing and documentation',
                'Track voucher case progress and deadlines',
                'Resolve client issues and answer questions about their vouchers',
                'Coordinate with other departments as needed',
              ],
              supportChannels: ['inbound', 'outbound', 'email', 'sms'],
              channelDescription: 'Inbound calls from injured workers. Outbound calls to insurance carriers, adjusters, schools, and injured workers. Email communication with all parties. Inbound & outbound SMS with injured workers.',
            },
            {
              id: 'rtw',
              title: 'RTW — Return to Work',
              subtitle: 'Follow-up on RTW supplement process for injured workers',
              description: 'The RTW team manages the Return to Work supplement process.',
              activities: [
                'Manage the RTW supplement process end-to-end',
                'Verify claimant eligibility for the $5,000 one-time payment',
                'Follow up with clients on RTW documentation and status',
                'Support injured workers through their return-to-work transition',
              ],
              supportChannels: ['inbound', 'outbound', 'email'],
              channelDescription: 'Inbound calls from injured workers, outbound calls for RTW documentation, emails',
            },
          ],
        },
      ],
    },
    {
      id: 'phase4',
      number: 4,
      label: 'OPERATION SUPPORT SERVICES',
      title: 'Email Support',
      color: 'bg-slate-600',
      textColor: 'text-slate-700',
      steps: [
        {
          id: 'oss',
          title: 'OSS — Operation Support Services',
          subtitle: 'Cross-functional, active throughout all stages',
          description: 'OSS plays a crucial role in facilitating communication between clients and insurers.',
          activities: [
            'Facilitate communication between clients and insurers',
            'Ensure timely responses to all parties',
            'Maintain accurate records for each case',
            'Enhance overall operational efficiency',
            'Active across all phases of the workflow',
          ],
          kpi: 'Cases/emails processed per day (department-specific target)',
          supportChannels: ['email'],
          channelDescription: 'Email only — facilitates communication between injured workers, insurers, and internal teams via email.',
        },
      ],
    },
    {
      id: 'phase5',
      number: 5,
      label: 'CALL CENTER',
      title: 'General Inquiry & Routing',
      color: 'bg-amber-600',
      textColor: 'text-amber-700',
      steps: [
        {
          id: 'callcenter',
          title: 'Call Center',
          subtitle: 'General inquiry line, routes to correct Case Specialist',
          description: 'The Call Center handles incoming calls from the general inquiry line.',
          activities: [
            'Receive calls from the general inquiry line',
            'Resolve client questions and provide information',
            'Route calls to the correct Case Specialist',
            'Handle overflow calls when Case Specialists send to voicemail',
          ],
          kpi: '0% missed calls — no missed call target',
          bottlenecks: [
            'High call volume during peak hours',
            'Difficulty routing when Case Specialists are unavailable',
          ],
          supportChannels: ['inbound', 'outbound', 'voicemail'],
          channelDescription: 'Inbound calls from injured workers and general inquiries. Outbound calls to injured workers. Voicemail overflow when Case Specialists are unavailable.',
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
    { value: 'chat', label: 'Chat', icon: MessageCircle, color: 'bg-indigo-100 border-indigo-300 text-indigo-900' },
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
          const Icon = ch.icon;
          return (
            <span key={channelType} className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border ${ch.color}`}>
              <Icon size={14} />
              {ch.label}
            </span>
          );
        })
      )}
    </div>
  );

  const handleBallMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y >= 0 && y <= rect.height) {
      setBallPosition(y);
      const phaseHeight = rect.height / phases.length;
      const phaseNum = Math.max(1, Math.min(phases.length, Math.ceil((y + phaseHeight / 2) / phaseHeight)));
      setCurrentPhase(phaseNum);
      detectStepAtPosition(y);
    }
  };

  const detectStepAtPosition = (ballY) => {
    let foundStep = null;
    for (let [stepId, element] of Object.entries(stepsRef.current)) {
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const stepTop = rect.top - timelineRect.top;
      const stepBottom = rect.bottom - timelineRect.top;
      if (Math.abs(ballY - (stepTop + stepBottom) / 2) < 150) {
        foundStep = stepId;
        break;
      }
    }
    setAutoExpandStep(foundStep);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <style>{`
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .step-accordion { animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; transform: translateY(-10px); }
          to { opacity: 1; max-height: 2000px; transform: translateY(0); }
        }
        .draggable-ball { cursor: grab; user-select: none; transition: filter 0.2s ease-out; }
        .draggable-ball:active { cursor: grabbing; filter: drop-shadow(0 12px 24px rgba(0,0,0,0.35)); }
        .draggable-ball:hover { filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25)); }
      `}</style>

      <div className="flex h-screen gap-4 p-4">
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-lg">
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-4xl">⚖️</span>
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-slate-900 leading-tight">Gemini Legal</h1>
                  <h2 className="text-2xl font-light text-slate-600 mt-2">Operations Workflow</h2>
                  <p className="text-slate-500 mt-3 text-base">End-to-end case lifecycle • Department process flow • Real-time tracking</p>
                </div>
              </div>
            </div>

            <div className="relative" ref={timelineRef}>
              <div className="absolute left-7 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-600 via-blue-600 via-green-600 to-amber-600 rounded-full"></div>

              <div
                ref={ballRef}
                className="absolute left-5 w-20 h-20 draggable-ball"
                style={{ top: `${ballPosition}px`, transform: 'translate(-2.5rem, -2.5rem)', zIndex: 50, pointerEvents: 'auto', visibility: 'hidden' }}
                onMouseDown={handleBallMouseDown}
              />

              <div className="space-y-12 relative">
                {phases.map((phase, index) => {
                  const showCrossSupport = index === 3;
                  return (
                    <React.Fragment key={phase.id}>
                      {showCrossSupport && (
                        <div className="pl-32 mb-12">
                          <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-2">All Phases</p>
                          <h2 className="text-3xl font-bold text-slate-900 mt-1">Cross-Functional Support</h2>
                        </div>
                      )}
                      <div className="pl-32">
                        <div className="mb-6">
                          <p className={`text-xs font-bold tracking-widest uppercase ${phase.textColor}`}>{phase.label}</p>
                          <h2 className="text-3xl font-bold text-slate-900 mt-1">{phase.title}</h2>
                        </div>

                        <div className="space-y-4">
                          {phase.steps.map((step) => {
                            const isExpanded = autoExpandStep === step.id || expandedStep === step.id;
                            return (
                              <div key={step.id} className="flex gap-4 items-start">
                                <div className="flex-1 step-accordion" ref={(el) => (stepsRef.current[step.id] = el)}>
                                  <button
                                    onClick={() => {
                                      const newExpanded = expandedStep === step.id ? null : step.id;
                                      setExpandedStep(newExpanded);
                                      setSelectedStepForPanel(newExpanded);
                                    }}
                                    className={`w-full p-5 rounded-xl text-white font-bold flex items-center justify-between transition-all duration-400 ease-out hover:shadow-xl hover:-translate-y-1 ${phase.color} ${isExpanded ? 'shadow-lg -translate-y-1' : 'shadow-md'}`}
                                  >
                                    <div className="text-left">
                                      <h3 className="text-lg">{step.title}</h3>
                                      <p className="text-sm opacity-85 font-normal mt-1">{step.subtitle}</p>
                                    </div>
                                    <ChevronDown size={24} className={`transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                                  </button>

                                  {isExpanded && (
                                    <div className="mt-3 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-md space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                                      <p className="text-slate-700 leading-relaxed text-base">{step.description}</p>

                                      <div>
                                        <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Key Activities</h4>
                                        <ul className="space-y-2">
                                          {step.activities.map((activity, i) => (
                                            <li key={i} className="text-sm text-slate-700 flex gap-3">
                                              <span className={`font-bold flex-shrink-0 mt-0.5 ${phase.textColor}`}>✓</span>
                                              {activity}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {step.kpi && (
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                                          <p className="text-sm">
                                            <span className="font-bold text-blue-900">📊 KPI: </span>
                                            <span className="text-blue-800">{step.kpi}</span>
                                          </p>
                                        </div>
                                      )}

                                      {step.bottlenecks && step.bottlenecks.length > 0 && (
                                        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                                          <p className="text-sm font-bold text-red-900 mb-2">⚠️ Common Bottlenecks</p>
                                          <ul className="space-y-1">
                                            {step.bottlenecks.map((bn, i) => (
                                              <li key={i} className="text-sm text-red-800 flex gap-2">
                                                <span className="flex-shrink-0">•</span>
                                                {bn}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {step.scorecard && (
                                        <div>
                                          <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Performance Scorecard</h4>
                                          <div className="overflow-x-auto">
                                            <table className="w-full text-xs border-collapse">
                                              <thead>
                                                <tr className="border-b-2 border-slate-300 bg-slate-100">
                                                  <th className="text-left p-3 font-bold text-slate-900">Metric</th>
                                                  <th className="text-left p-3 font-bold text-slate-900">Category</th>
                                                  <th className="text-left p-3 font-bold text-slate-900">Target</th>
                                                  <th className="text-left p-3 font-bold text-slate-900">Weight</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {step.scorecard.map((row, i) => (
                                                  <tr key={i} className="border-b border-slate-200 hover:bg-white transition-colors">
                                                    <td className="p-3 text-slate-700 font-medium">{row.metric}</td>
                                                    <td className="p-3 text-slate-600">{row.category}</td>
                                                    <td className="p-3 text-slate-700 font-bold">{row.target}</td>
                                                    <td className="p-3">
                                                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-xs">{row.weight}</span>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}

                                      {step.branches && step.branches.length > 0 && (
                                        <div className="mt-6 pt-6 border-t-2 border-slate-300">
                                          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">📌 Branch Operations</h4>
                                          <div className="space-y-3">
                                            {step.branches.map((branch) => (
                                              <div key={branch.id}>
                                                <button
                                                  onClick={() => toggleBranch(expandedBranch === branch.id ? null : branch.id)}
                                                  className="w-full p-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center justify-between transition-all hover:shadow-lg"
                                                >
                                                  <div className="text-left">
                                                    <h5 className="font-bold">{branch.title}</h5>
                                                    <p className="text-xs opacity-85 font-normal mt-0.5">{branch.subtitle}</p>
                                                  </div>
                                                  <ChevronDown size={20} className={`transition-transform flex-shrink-0 ${expandedBranch === branch.id ? 'rotate-180' : ''}`} />
                                                </button>

                                                {expandedBranch === branch.id && (
                                                  <div className="mt-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200 space-y-4">
                                                    <p className="text-slate-700 text-sm">{branch.description}</p>
                                                    <div>
                                                      <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wide">Key Activities</h4>
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

                                <div className="w-80 flex-shrink-0">
                                  <button
                                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                    className={`w-full p-5 rounded-xl text-white font-bold flex items-center justify-between transition-all duration-400 ease-out shadow-md ${phase.color} ${isExpanded ? 'shadow-lg -translate-y-1' : 'shadow-md'}`}
                                  >
                                    <div className="text-left">
                                      <h3 className="text-sm opacity-90">Available</h3>
                                      <p className="text-xs opacity-75 font-normal mt-0.5">Channels</p>
                                    </div>
                                    <ChevronDown size={20} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                  </button>

                                  {isExpanded && step.supportChannels && step.supportChannels.length > 0 && (
                                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-md space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiWorkflowApp;
