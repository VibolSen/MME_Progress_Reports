/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: Sync Presentation Data with Updated data.md Across All 3 General Departments
 */

export type Language = "en" | "km";

export interface SlideItem {
  id: number;
  labelEn: string;
  labelKm: string;
  titleEn: string;
  titleKm: string;
  subtitleEn?: string;
  subtitleKm?: string;
  categoryEn?: string;
  categoryKm?: string;
}

export const PRESENTATION_META = {
  projectTitleEn: "MME Progress Reports",
  projectTitleKm: "របាយការណ៍វឌ្ឍភាពការងារ MME",
  clientEn: "Ministry of Mines and Energy (MME)",
  clientKm: "ក្រសួងរ៉ែ និងថាមពល (MME)",
  companyEn: "OONE Power Technology Co., Ltd",
  companyKm: "ក្រុមហ៊ុន អូន ផៅវ័រ ថេកណឡជី (OONE Power Technology Co., Ltd)",
  dateEn: "November 2026",
  dateKm: "ខែវិច្ឆិកា ឆ្នាំ២០២៦",
  taglineEn:
    "Comprehensive progress report across the General Department of General Affairs, General Department of Mineral Resources, and General Department of Petroleum.",
  taglineKm:
    "របាយការណ៍វឌ្ឍភាពការងារនៃអគ្គនាយកដ្ឋានកិច្ចការទូទៅ អគ្គនាយកដ្ឋានធនធានរ៉ែ និងអគ្គនាយកដ្ឋានប្រេងកាត។",
};

export const AGENDA_ITEMS = [
  {
    num: "01",
    key: "gdga",
    titleEn: "General Dept. of General Affairs",
    titleKm: "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (គម្រោងទី១)",
    descEn:
      "Progress across 5 core components: Meeting Room (100% Live), Mission Request (65%), Secretariat Documents (60%), Maintenance/Supply/Assets/Budget (10% studied), and Payroll (Pending study).",
    descKm:
      "វឌ្ឍភាពគម្រោងទី១ លើសមាសភាគទាំង ៥៖ សេវាបន្ទប់ប្រជុំ (100%) ស្នើសុំបេសកកម្ម (65%) ឯកសារអគ្គលេខាធិការដ្ឋាន (60%) ថែទាំ/ផ្គត់ផ្គង់/ទ្រព្យសម្បត្តិ/ផែនការថវិកា (10%) និងប្រាក់បៀវត្ស។",
    tagEn: "Project 1 · 5 Components",
    tagKm: "គម្រោងទី១ · សមាសភាគទាំង ៥",
  },
  {
    num: "02",
    key: "gdmr",
    titleEn: "General Dept. of Mineral Resources",
    titleKm: "អគ្គនាយកដ្ឋានធនធានរ៉ែ (គម្រោងទី២)",
    descEn:
      "Digital public service system for the mining sector: Applicant Web Portal (3 services ready) and Internal Back-Office Web Portal (3 services ready) for open-pit mines and quarries.",
    descKm:
      "គម្រោងទី២៖ ប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ រួមមាន Web Portal សម្រាប់អ្នកស្នើសុំ (៣ សេវា រួចរាល់) និង Web Portal សម្រាប់ការងារផ្ទៃក្នុង (៣ សេវា រួចរាល់)។",
    tagEn: "Project 2 · 3 Mining Services",
    tagKm: "គម្រោងទី២ · សេវាវិស័យរ៉ែទាំង ៣",
  },
  {
    num: "03",
    key: "gdp",
    titleEn: "General Dept. of Petroleum & Challenges",
    titleKm: "អគ្គនាយកដ្ឋានប្រេងកាត និងចំណុចប្រឈម",
    descEn:
      "Applicant Portal (2 ready, 1 at 90%), Internal Portal (75%, Ready, Provincial Inspection testing on Nov 10 2026, & Offline Auto-Save 5%), plus key challenges & timeline.",
    descKm:
      "Web Portal អ្នកស្នើសុំ (រួចរាល់ ២ និង 90% ១) Web Portal ផ្ទៃក្នុងក្រសួង (75%, រួចរាល់, តេស្តជំហានមន្ទីរចុះពិនិត្យទីតាំង ១០ វិច្ឆិកា ២០២៦, Offline 5%) និងចំណុចប្រឈម។",
    tagEn: "Petroleum Portals · Challenges",
    tagKm: "វិស័យប្រេងកាត · ចំណុចប្រឈម",
  },
];

export const DEPARTMENTS = [
  {
    id: "dep1",
    nameEn: "General Department of General Affairs",
    nameKm: "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ",
    status: "active",
    statusEn: "Project 1 · 5 Components",
    statusKm: "គម្រោងទី១ · ៥ សមាសភាគ",
    badgeEn: "100% Live to 10% Studied",
    badgeKm: "ដំណើរការ 100% ដល់សិក្សា 10%",
    componentsCount: 5,
    liveServicesCount: 1,
    inProgressCount: 4,
    descriptionEn:
      "Component 1 (Maintenance 10%, Supply 10%, Meeting Room 100%), Component 2 (Mission 65%, Payroll Pending), Component 3 (State Assets 10%), Component 4 (Planning & Budget 10%), and Component 5 (Secretariat 60%).",
    descriptionKm:
      "សមាសភាគទី១ (ថែទាំ 10%, ផ្គត់ផ្គង់ 10%, បន្ទប់ប្រជុំ 100%), សមាសភាគទី២ (បេសកកម្ម 65%, ប្រាក់បៀវត្ស រង់ចាំសិក្សាបន្ថែម), សមាសភាគទី៣ (ទ្រព្យសម្បត្តិរដ្ឋ 10%), សមាសភាគទី៤ (ផែនការ និងថវិកា 10%), និងសមាសភាគទី៥ (អគ្គលេខាធិការដ្ឋាន 60%)។",
  },
  {
    id: "dep2",
    nameEn: "General Department of Mineral Resources",
    nameKm: "អគ្គនាយកដ្ឋានធនធានរ៉ែ",
    status: "active",
    statusEn: "Project 2 · 3 Services Ready",
    statusKm: "គម្រោងទី២ · ៣ សេវា រួចរាល់",
    badgeEn: "Applicant & Internal Portals Ready",
    badgeKm: "Web Portal ទាំង ២ រៀបចំរួចរាល់",
    componentsCount: 2,
    liveServicesCount: 3,
    inProgressCount: 2,
    descriptionEn:
      "Digital public service system for the mining sector: Applicant Web Portal (3 services ready) and Internal Web Portal (3 services ready). Services 2 & 3 configured following Service 1 template, awaiting Ministry review.",
    descriptionKm:
      "ប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ៖ Web Portal សម្រាប់អ្នកស្នើសុំ (៣ សេវា រួចរាល់) និង Web Portal សម្រាប់ការងារផ្ទៃក្នុង (៣ សេវា រួចរាល់)។ សេវាទី២ និងទី៣ រៀបចំតាមលំនាំសេវាទី១ រង់ចាំក្រសួងពិនិត្យបន្ថែម។",
  },
  {
    id: "dep3",
    nameEn: "General Department of Petroleum",
    nameKm: "អគ្គនាយកដ្ឋានប្រេងកាត",
    status: "active",
    statusEn: "Applicant & Internal Portals",
    statusKm: "Web Portal អ្នកស្នើសុំ និងផ្ទៃក្នុង",
    badgeEn: "Up to 90% & Joint Provincial Testing",
    badgeKm: "រហូតដល់ 90% និងតេស្តជាមួយមន្ទីរខេត្ត",
    componentsCount: 2,
    liveServicesCount: 3,
    inProgressCount: 4,
    descriptionEn:
      "Applicant Web Portal (2 services ready awaiting review, 1 station safety certificate at 90%) & Internal Ministry Portal (75%, Ready, Provincial inspection step tested Nov 10 2026, and Offline Auto-Save at 5%).",
    descriptionKm:
      "Web Portal អ្នកស្នើសុំ (២ សេវារួចរាល់រង់ចាំពិនិត្យ និង ១ សេវា 90%) និង Web Portal ផ្ទៃក្នុងក្រសួង (75%, រួចរាល់, តេស្តដល់ជំហានមន្ទីរចុះពិនិត្យទីតាំងថ្ងៃទី១០ វិច្ឆិកា ២០២៦ និងមុខងារ Offline 5%)។",
  },
];

export const COMPONENTS_DATA = [
  {
    id: "c1",
    num: "1.1",
    titleEn: "Component 1: Maintenance, Supply & Meeting Room",
    titleKm: "សមាសភាគទី១៖ ការងារថែទាំ ផ្គត់ផ្គង់ និងសេវាបន្ទប់ប្រជុំ",
    overallProgress: 40,
    subtasks: [
      {
        id: "1.1.1",
        titleEn: "1.1.1 Maintenance & Repair Work (10%)",
        titleKm: "1.1.1 ការងារថែទាំ និងជួសជុល (10%)",
        status: "study",
        progress: 10,
        statusEn: "User Requirements Studied (10%)",
        statusKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)",
        notesEn:
          "Studied user requirements (10%) with departmental staff for maintenance and repair workflows.",
        notesKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%) សម្រាប់ការងារថែទាំ និងជួសជុល។",
      },
      {
        id: "1.1.2",
        titleEn: "1.1.2 Supply Work (10%)",
        titleKm: "1.1.2 ការងារផ្គត់ផ្គង់ (10%)",
        status: "study",
        progress: 10,
        statusEn: "User Requirements Studied (10%)",
        statusKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)",
        notesEn:
          "Studied user requirements (10%) for supply and requisition operations.",
        notesKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%) សម្រាប់ការងារផ្គត់ផ្គង់។",
      },
      {
        id: "1.1.3",
        titleEn: "1.1.3 Meeting Room Service (100%)",
        titleKm: "1.1.3 សេវាបន្ទប់ប្រជុំ (100%)",
        status: "live",
        progress: 100,
        statusEn: "Officially Launched (100%)",
        statusKm: "បានដាក់ដំណើរការជាផ្លូវការ (100%)",
        notesEn:
          "Officially launched (100%) and actively operating across the General Department.",
        notesKm: "បានដាក់ដំណើរការជាផ្លូវការ (100%) ជូនមន្ត្រីប្រើប្រាស់។",
      },
    ],
  },
  {
    id: "c2",
    num: "1.2",
    titleEn: "Component 2: Mission Request & Payroll Processing",
    titleKm: "សមាសភាគទី២៖ ការស្នើសុំបេសកកម្ម និងដំណើរការប្រាក់បៀវត្ស",
    overallProgress: 65,
    subtasks: [
      {
        id: "1.2.1",
        titleEn: "1.2.1 Mission Request (65%)",
        titleKm: "1.2.1 ការស្នើសុំបេសកកម្ម (65%)",
        status: "ready",
        progress: 65,
        statusEn: "System Setup Ready (65%)",
        statusKm: "ការរៀបចំប្រព័ន្ធរួចរាល់ (65%)",
        notesEn:
          "System setup is completed and ready at 65% for digital mission request workflows.",
        notesKm: "ការរៀបចំប្រព័ន្ធរួចរាល់ (65%) សម្រាប់ការស្នើសុំបេសកកម្ម។",
      },
      {
        id: "1.2.2",
        titleEn: "1.2.2 Payroll Processing (Pending Study)",
        titleKm: "1.2.2 ដំណើរការប្រាក់បៀវត្ស (រង់ចាំការសិក្សាបន្ថែម)",
        status: "pending",
        progress: 0,
        statusEn: "Awaiting Further Study with Ministry",
        statusKm: "រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម",
        notesEn:
          "Awaiting further technical study and coordination with the Ministry.",
        notesKm: "រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែមលើដំណើរការប្រាក់បៀវត្ស។",
      },
    ],
  },
  {
    id: "c3",
    num: "1.3",
    titleEn: "Component 3: State Asset Management System",
    titleKm: "សមាសភាគទី៣៖ ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ",
    overallProgress: 10,
    subtasks: [
      {
        id: "1.3.1",
        titleEn: "State Asset Management System (10%)",
        titleKm: "ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ (10%)",
        status: "study",
        progress: 10,
        statusEn: "User Requirements Studied (10%)",
        statusKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)",
        notesEn:
          "User requirements studied (10%) for the State Asset Management System.",
        notesKm:
          "ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)។",
      },
    ],
  },
  {
    id: "c4",
    num: "1.4",
    titleEn:
      "Component 4: Planning, Budget, Implementation, Monitoring & Evaluation",
    titleKm:
      "សមាសភាគទី៤៖ ប្រព័ន្ធគ្រប់គ្រងផែនការ ថវិកា និងការអនុវត្ត ព្រមទាំងតាមដាន ត្រួតពិនិត្យ និងវាយតម្លៃ",
    overallProgress: 10,
    subtasks: [
      {
        id: "1.4.1",
        titleEn:
          "Planning, Budget, Implementation, Monitoring & Evaluation System (10%)",
        titleKm:
          "ប្រព័ន្ធគ្រប់គ្រងផែនការ ថវិកា និងការអនុវត្ត ព្រមទាំងតាមដាន ត្រួតពិនិត្យ និងវាយតម្លៃ (10%)",
        status: "study",
        progress: 10,
        statusEn: "User Requirements Studied (10%)",
        statusKm: "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)",
        notesEn:
          "User requirements studied (10%) for planning, budgeting, implementation, monitoring, and evaluation.",
        notesKm:
          "ប្រព័ន្ធគ្រប់គ្រងផែនការ ថវិកា និងការអនុវត្ត ព្រមទាំងតាមដាន ត្រួតពិនិត្យ និងវាយតម្លៃ បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)។",
      },
    ],
  },
  {
    id: "c5",
    num: "1.5",
    titleEn: "Component 5 (60%): For General Secretariat",
    titleKm: "សមាសភាគទី៥ (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន",
    overallProgress: 60,
    subtasks: [
      {
        id: "1.5.1",
        titleEn: "1.5.1 Inbound/Outbound & Chronological Documents",
        titleKm: "1.5.1 ការគ្រប់គ្រងឯកសារចូល/ចេញ និងឯកសារកាលប្បវត្តិ",
        status: "ready",
        progress: 60,
        statusEn: "System Setup Ready",
        statusKm: "ការរៀបចំប្រព័ន្ធរួចរាល់",
        notesEn:
          "System setup ready for inbound/outbound and chronological document management.",
        notesKm:
          "ការគ្រប់គ្រងឯកសារចូល/ចេញ និងឯកសារកាលប្បវត្តិ៖ ការរៀបចំប្រព័ន្ធរួចរាល់។",
      },
      {
        id: "1.5.2",
        titleEn: "1.5.2 Upload and Manage Internal Documents",
        titleKm:
          "1.5.2 ការផ្ទុក និងគ្រប់គ្រងឯកសារផ្ទៃក្នុង (Upload and Manage Internal Documents)",
        status: "ready",
        progress: 60,
        statusEn: "System Setup Ready",
        statusKm: "ការរៀបចំប្រព័ន្ធរួចរាល់",
        notesEn:
          "System setup ready for uploading and managing internal documents.",
        notesKm:
          "ការផ្ទុក និងគ្រប់គ្រងឯកសារផ្ទៃក្នុង (Upload and Manage Internal Documents)៖ ការរៀបចំប្រព័ន្ធរួចរាល់។",
      },
      {
        id: "1.5.3",
        titleEn: "1.5.3 Document Verification",
        titleKm: "1.5.3 ការផ្ទៀងផ្ទាត់ឯកសារ",
        status: "ready",
        progress: 60,
        statusEn: "System Setup Ready",
        statusKm: "ការរៀបចំប្រព័ន្ធរួចរាល់",
        notesEn:
          "System setup ready for official document verification.",
        notesKm: "ការផ្ទៀងផ្ទាត់ឯកសារ៖ ការរៀបចំប្រព័ន្ធរួចរាល់។",
      },
    ],
  },
];

export const MINERAL_RESOURCES_DATA = {
  deptTitleEn: "General Department of Mineral Resources",
  deptTitleKm: "អគ្គនាយកដ្ឋានធនធានរ៉ែ",
  projectTitleEn:
    "Project 2: Digital Public Service System for the Mining Sector",
  projectTitleKm:
    "គម្រោងទី២៖ ការងាររៀបចំប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ",
  applicantPortalTitleEn: "I. Web Portal for Applicants — Ready (3 Services)",
  applicantPortalTitleKm:
    "I. Web Portal សម្រាប់អ្នកស្នើសុំ បានរៀបចំរួចរាល់ ដែលមានចំនួន 3 សេវា",
  internalPortalTitleEn:
    "II. Web Portal for Internal Operations — Ready (3 Services)",
  internalPortalTitleKm:
    "II. Web Portal សម្រាប់ការងារផ្ទៃក្នុង បានរៀបចំរួចរាល់ ដែលមានចំនួន 3 សេវា",
  services: [
    {
      num: "01",
      titleEn:
        "Open-Pit Mine & Quarry License: Construction Stone, Gypsum & Similar Resources (≤ 10 Ha)",
      titleKm:
        "ស្នើសុំអាជ្ញាបណ្ណអណ្តូងរ៉ែបើក និងការដ្ឋានវាយថ្ម សម្រាប់ធ្វើអាជីវកម្មថ្មសំណង់ ម្នាងសិលា និងធនធានរ៉ែផ្សេងទៀត ដែលមានលក្ខណៈប្រហាក់ប្រហែល មានទំហំមិនលើសពី ១០ហិកតា",
      statusEn: "Applicant & Internal Portals Ready",
      statusKm: "Web Portal អ្នកស្នើសុំ និងផ្ទៃក្នុង រៀបចំរួចរាល់",
    },
    {
      num: "02",
      titleEn:
        "Open-Pit Mine & Quarry License: Exploration of Construction Stone, Gypsum & Similar Resources",
      titleKm:
        "ស្នើសុំអាជ្ញាបណ្ណអណ្តូងរ៉ែបើក និងការដ្ឋានវាយថ្ម សម្រាប់គោលបំណងអនុវត្តការងារស្វែងរុករកថ្មសំណង់ ម្នាងសិលា និងធនធានរ៉ែផ្សេងទៀត ដែលមានលក្ខណៈប្រហាក់ប្រហែល",
      statusEn: "Built on Service 1 Template · Pending Review",
      statusKm: "រៀបចំតាមលំនាំសេវាទី១ · រង់ចាំក្រសួងពិនិត្យបន្ថែម",
    },
    {
      num: "03",
      titleEn:
        "Open-Pit Mine & Quarry License: Extraction of Earthfill, Laterite & Clay (≤ 10 Ha)",
      titleKm:
        "ស្នើសុំអាជ្ញាបណ្ណអណ្តូងរ៉ែបើក និងការដ្ឋានវាយថ្ម សម្រាប់ធ្វើអាជីវកម្មអាចម៍ដី ឡាតេរីត ដីឥដ្ឋ មានទំហំមិនលើសពី ១០ហិកតា",
      statusEn: "Built on Service 1 Template · Pending Review",
      statusKm: "រៀបចំតាមលំនាំសេវាទី១ · រង់ចាំក្រសួងពិនិត្យបន្ថែម",
    },
  ],
  noteTitleEn: "III. Important Note / Remark",
  noteTitleKm: "III. ចំណាំសម្គាល់",
  noteTextEn:
    "For Services 2 and 3, the working team configured the system following the template of Service 1, awaiting further review from the Ministry working group to refine according to actual practice.",
  noteTextKm:
    "សម្រាប់ការរៀបចំសេវាទី2 និងទី3 ក្រុមការងារបានរៀបចំតាមលំនាំសេវាទី1 រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។",
};

export const PETROLEUM_DATA = {
  deptTitleEn: "General Department of Petroleum",
  deptTitleKm: "អគ្គនាយកដ្ឋានប្រេងកាត",
  applicantPortal: {
    titleEn: "I. Web Portal for Applicants",
    titleKm: "I. Web Portal សម្រាប់អ្នកស្នើសុំ",
    services: [
      {
        num: "01",
        titleEn:
          "Review, Reception & Processing of Application and Renewal of Technical Safety Certificate for Fuel or LPG Stations",
        titleKm:
          "ស្នើសុំពិនិត្យ ទទួល និងដំណើរការឯកសារស្នើសុំនិងការបន្តសុពលភាពវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព សម្រាប់ស្ថានីយប្រេងឥន្ធនៈ ឬស្ថានីយឧស្ម័នឥន្ធនៈ",
        badgeEn: "Ready · Pending Review",
        badgeKm: "បានរៀបចំរួចរាល់",
        notesEn:
          "Setup completed — awaiting further review by the Ministry working group for refinement.",
        notesKm:
          "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួល)។",
      },
      {
        num: "02",
        titleEn:
          "Technical Safety Certificate & Commercial License for Petroleum and/or LPG Packaging Operations (by Annual Capacity)",
        titleKm:
          "ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព និងអាជ្ញាបណ្ណពាណិជ្ជកម្ម សម្រាប់សកម្មភាពវេចខ្ចប់ផលិតផលប្រេងកាត និងឬឧស្ម័នឥន្ធនៈ ដែលមានសមត្ថភាពវេចខ្ចប់សរុបក្នុងមួយឆ្នាំ",
        badgeEn: "Ready · Pending Review",
        badgeKm: "បានរៀបចំរួចរាល់",
        notesEn:
          "Setup completed — awaiting further review by the Ministry working group for refinement.",
        notesKm:
          "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួល)។",
      },
      {
        num: "03",
        titleEn: "Technical Safety Certificate Application for Stations (90%)",
        titleKm:
          "ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ (90%)",
        badgeEn: "90% · Nov 10 Refinement",
        badgeKm: "90% · កែសម្រួលបន្ថែម",
        notesEn:
          "90% complete — additional refinements requested during the meeting on November 10, 2026 at 2:30 PM.",
        notesKm:
          "(90%) មានការស្នើសុំកែសម្រួលបន្ថែមក្នុងអង្គប្រជុំកាលពីថ្ងៃទី១០ ខែវិច្ឆិកា ឆ្នាំ២០២៦ ម៉ោង 2:30 PM។",
      },
    ],
  },
  internalPortal: {
    titleEn: "II. Web Portal for Internal Ministry Use",
    titleKm: "II. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង",
    services: [
      {
        num: "01",
        titleEn:
          "Review, Reception & Processing of Application and Renewal of Technical Safety Certificate for Fuel or LPG Stations (75%)",
        titleKm:
          "ស្នើសុំពិនិត្យ ទទួល និងដំណើរការឯកសារស្នើសុំនិងការបន្តសុពលភាពវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព សម្រាប់ស្ថានីយប្រេងឥន្ធនៈ ឬស្ថានីយឧស្ម័នឥន្ធនៈ (75%)",
        badgeEn: "75% Complete",
        badgeKm: "75%",
        notesEn: "",
        notesKm: "",
      },
      {
        num: "02",
        titleEn:
          "Technical Safety Certificate & Commercial License for Petroleum and/or LPG Packaging Operations (by Annual Capacity)",
        titleKm:
          "ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព និងអាជ្ញាបណ្ណពាណិជ្ជកម្ម សម្រាប់សកម្មភាពវេចខ្ចប់ផលិតផលប្រេងកាត និងឬឧស្ម័នឥន្ធនៈ ដែលមានសមត្ថភាពវេចខ្ចប់សរុបក្នុងមួយឆ្នាំ",
        badgeEn: "Ready · Pending Review",
        badgeKm: "បានរៀបចំរួចរាល់",
        notesEn:
          "Setup completed (awaiting further review by the Ministry working group for refinement).",
        notesKm:
          "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួល)។",
      },
      {
        num: "03",
        titleEn: "Technical Safety Certificate Application for Stations",
        titleKm:
          "ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ",
        badgeEn: "Nov 10, 2026 · 2:30 PM",
        badgeKm: "១០ វិច្ឆិកា ២០២៦ · 2:30 PM",
        notesEn:
          "(On Nov 10, 2026 at 2:30 PM, continued pilot testing with the Department and Provincial Department up to the Provincial On-Site Inspection step, and requested refinements on several items in the data entry screen.)",
        notesKm:
          "(កាលពីថ្ងៃទី១០ ខែវិច្ឆិកា ឆ្នាំ២០២៦ ម៉ោង 2:30 PM បានបន្តតេស្តសាកល្បងជាមួយនាយកដ្ឋាន និងមន្ទីរខេត្ត ដល់ជំហានមន្ទីរចុះពិនិត្យទីតាំង ហើយបានស្នើសុំកែសម្រួលលើចំណុចមួយចំនួនក្នុងផ្ទាំងបញ្ចូលព័ត៌មាន)",
      },
      {
        num: "04",
        titleEn:
          "Offline Mode Function (e.g., Auto-Save Data When Internet Disconnects) (5%)",
        titleKm:
          "មុខងារ Offline (ឧ. អោយ Save ទិន្នន័យ Auto ករណីដាច់ Internet) (5%)",
        badgeEn: "5% In Progress",
        badgeKm: "5%",
        notesEn: "",
        notesKm: "",
      },
    ],
  },
};

export const PENDING_ITEMS_SUMMARY = [
  {
    id: "p1",
    component: "GDP · Petroleum",
    titleEn: "Provincial On-Site Inspection Form Alignment",
    titleKm: "ការកែសម្រួលផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហានមន្ទីរចុះពិនិត្យទីតាំង",
    impactEn: "High Priority",
    impactKm: "អាទិភាពខ្ពស់",
    statusEn: "Requested Nov 10, 2026 (2:30 PM)",
    statusKm: "ស្នើសុំថ្ងៃទី១០ វិច្ឆិកា ២០២៦",
    detailEn:
      "For Station Technical Safety Certificates (Services 1 & 3), the data entry form at the Provincial Department On-Site Inspection step is requested to match the official inspection minutes.",
    detailKm:
      "សម្រាប់សេវាវិញ្ញាបនបត្របច្ចេកទេសសុវត្ថិភាពស្ថានីយ ផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហានមន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ។",
  },
  {
    id: "p2",
    component: "GDMR · Mining",
    titleEn: "Ministry Review of Mining Services 2 & 3",
    titleKm: "ការពិនិត្យបន្ថែមលើសេវាវិស័យរ៉ែទី២ និងទី៣",
    impactEn: "Pending Review",
    impactKm: "រង់ចាំការពិនិត្យបន្ថែម",
    statusEn: "Built on Service 1 Template",
    statusKm: "រៀបចំតាមលំនាំសេវាទី១",
    detailEn:
      "Services 2 & 3 (Exploration & Earthfill/Laterite/Clay ≤ 10 Ha) are configured following Service 1's pattern and await Ministry working group review to refine per actual practice.",
    detailKm:
      "សម្រាប់ការរៀបចំសេវាទី2 និងទី3 ក្រុមការងារបានរៀបចំតាមលំនាំសេវាទី1 រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។",
  },
  {
    id: "p3",
    component: "GDGA · General Affairs",
    titleEn: "Payroll Joint Study & 10% Requirement Modules",
    titleKm: "ការសិក្សាប្រាក់បៀវត្សបន្ថែម និងម៉ូឌុលសិក្សា 10%",
    impactEn: "Ministry Coordination",
    impactKm: "ការសម្របសម្រួលជាមួយក្រសួង",
    statusEn: "Pending Study & Development",
    statusKm: "រង់ចាំការសិក្សាបន្ថែម",
    detailEn:
      "Payroll Processing (1.2.2) awaits further study with the Ministry; Maintenance (1.1.1), Supply (1.1.2), State Assets (1.3), and Planning/Budget (1.4) are at 10% user requirement study.",
    detailKm:
      "ដំណើរការប្រាក់បៀវត្ស (1.2.2) រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម ខណៈការងារថែទាំ ផ្គត់ផ្គង់ ទ្រព្យសម្បត្តិរដ្ឋ និងផែនការថវិកា បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)។",
  },
];

export const CHALLENGES_DATA = [
  {
    id: "ch1",
    num: "01",
    categoryEn: "General Dept. of Petroleum (ចំណុចប្រឈម)",
    categoryKm: "អគ្គនាយកដ្ឋានប្រេងកាត (ចំណុចប្រឈម)",
    titleEn: "Station Safety Certificate & Renewal Form Layout",
    titleKm:
      "វិញ្ញាបនបត្របច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ និងការបន្តសុពលភាព",
    problemEn:
      "1. Technical Safety Certificate for Stations (90%) and 2. Renewal/Processing of Technical Safety Certificates for Fuel or LPG Stations (75%): During the Nov 10, 2026 (2:30 PM) test with the Department and Provincial Department, adjustments were requested at the Provincial On-Site Inspection step.",
    problemKm:
      "១. ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ និង ២. ស្នើសុំពិនិត្យ ទទួល និងដំណើរការឯកសារស្នើសុំនិងការបន្តសុពលភាពសម្រាប់ស្ថានីយប្រេងឥន្ធនៈ ឬឧស្ម័នឥន្ធនៈ៖ មានសំណើកែសម្រួលពេលតេស្តជាមួយនាយកដ្ឋាន និងមន្ទីរខេត្ត (១០ វិច្ឆិកា ២០២៦ ម៉ោង 2:30 PM)។",
    solutionEn:
      "Update the data entry screen at the Provincial Department On-Site Inspection step so that it displays matching the official inspection minutes (បង្ហាញដូចកំណត់ហេតុ), and continue Offline Auto-Save (5%).",
    solutionKm:
      "កែសម្រួលផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហាន មន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ និងបន្តអភិវឌ្ឍមុខងារ Offline Save Auto (5%)។",
  },
  {
    id: "ch2",
    num: "02",
    categoryEn: "General Dept. of Mineral Resources (ចំណាំសម្គាល់)",
    categoryKm: "អគ្គនាយកដ្ឋានធនធានរ៉ែ (ចំណាំសម្គាល់)",
    titleEn: "Refinement of Mining Services 2 & 3 Workflows",
    titleKm: "ការពិនិត្យ និងកែសម្រួលសេវាវិស័យរ៉ែទី២ និងទី៣ តាមការអនុវត្តជាក់ស្ដែង",
    problemEn:
      "Both Applicant and Internal Web Portals for all 3 Mining Services are ready. However, Services 2 (Exploration) and 3 (Earthfill, Laterite, Clay ≤ 10 Ha) were configured following Service 1's workflow pattern.",
    problemKm:
      "Web Portal សម្រាប់អ្នកស្នើសុំ និងការងារផ្ទៃក្នុងទាំង ៣ សេវាបានរៀបចំរួចរាល់ ប៉ុន្តែសេវាទី២ និងទី៣ ត្រូវបានរៀបចំតាមលំនាំសេវាទី១។",
    solutionEn:
      "Coordinate with the Ministry working group to review Services 2 and 3 and adjust the workflows according to actual operational practice.",
    solutionKm:
      "រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមលើសេវាទី២ និងទី៣ ដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។",
  },
  {
    id: "ch3",
    num: "03",
    categoryEn: "General Dept. of General Affairs (សំណូមពរ)",
    categoryKm: "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (សំណូមពរ)",
    titleEn: "Payroll Study & Requirement Sign-offs (10% Modules)",
    titleKm: "ការសិក្សាប្រព័ន្ធប្រាក់បៀវត្សបន្ថែម និងការពន្លឿនម៉ូឌុល 10%",
    problemEn:
      "Payroll Processing (1.2.2) is awaiting further study with the Ministry, while Maintenance (1.1.1), Supply (1.1.2), State Assets (1.3), and Planning/Budget/M&E (1.4) are at 10% user requirements study.",
    problemKm:
      "ដំណើរការប្រាក់បៀវត្ស (1.2.2) រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម ខណៈការងារថែទាំ (1.1.1) ផ្គត់ផ្គង់ (1.1.2) ទ្រព្យសម្បត្តិរដ្ឋ (1.3) និងផែនការថវិកា (1.4) ស្ថិតនៅ 10%។",
    solutionEn:
      "Conduct further study sessions with the Ministry for Payroll (1.2.2) and finalize requirement sign-offs to advance the 10% modules alongside Mission (65%) and Secretariat (60%).",
    solutionKm:
      "រៀបចំកិច្ចប្រជុំសិក្សាបន្ថែមជាមួយក្រសួងលើប្រព័ន្ធប្រាក់បៀវត្ស និងជំរុញការអភិវឌ្ឍម៉ូឌុលដែលបានសិក្សាតម្រូវការ 10% រួមជាមួយបេសកកម្ម (65%) និងអគ្គលេខាធិការដ្ឋាន (60%)។",
  },
];

export const TIMELINE_MILESTONES = [
  {
    phase: "Phase 1",
    phaseKm: "ដំណាក់កាលទី ១",
    timeframeEn: "Completed & Live Systems",
    timeframeKm: "ប្រព័ន្ធដាក់ដំណើរការ និងរៀបចំរួចរាល់",
    status: "done",
    titleEn: "Launched Services & Portal Readiness",
    titleKm: "សេវាដាក់ដំណើរការផ្លូវការ និងការរៀបចំ Web Portal",
    bulletsEn: [
      "GDGA: Meeting Room Service officially launched (100% Live)",
      "GDMR: Applicant & Internal Web Portals ready for all 3 Mining Services",
      "GDP: Applicant & Internal Portals ready for Services 1 & 2 (Packaging & Renewals)",
    ],
    bulletsKm: [
      "កិច្ចការទូទៅ៖ សេវាបន្ទប់ប្រជុំបានដាក់ដំណើរការជាផ្លូវការ (100%)",
      "ធនធានរ៉ែ៖ Web Portal អ្នកស្នើសុំ និងផ្ទៃក្នុង រៀបចំរួចរាល់ទាំង ៣ សេវា",
      "ប្រេងកាត៖ Web Portal សេវាទី១ និងទី២ បានរៀបចំរួចរាល់",
    ],
  },
  {
    phase: "Phase 2",
    phaseKm: "ដំណាក់កាលទី ២",
    timeframeEn: "Active Testing & Refinements (Nov 2026)",
    timeframeKm: "ការតេស្តសាកល្បង និងកែសម្រួលបន្ថែម (វិច្ឆិកា ២០២៦)",
    status: "current",
    titleEn: "Provincial Inspection Refinements & 60–90% Modules",
    titleKm: "ការកែសម្រួលតាមមន្ទីរខេត្ត និងម៉ូឌុលសម្រេចបាន 60%–90%",
    bulletsEn: [
      "GDP: Refine Station Certificate (90% / 75%) Provincial Inspection form per Nov 10 meeting",
      "GDGA: Complete Mission Request (65%) and General Secretariat Document System (60%)",
      "GDMR: Ministry working group review of Mining Services 2 & 3",
    ],
    bulletsKm: [
      "ប្រេងកាត៖ កែសម្រួលផ្ទាំងជំហានមន្ទីរចុះពិនិត្យទីតាំងឱ្យដូចកំណត់ហេតុ (សេវា 90% & 75%)",
      "កិច្ចការទូទៅ៖ បញ្ចប់ការស្នើសុំបេសកកម្ម (65%) និងឯកសារអគ្គលេខាធិការដ្ឋាន (60%)",
      "ធនធានរ៉ែ៖ ក្រុមការងារក្រសួងពិនិត្យបន្ថែមលើសេវាទី២ និងទី៣",
    ],
  },
  {
    phase: "Phase 3",
    phaseKm: "ដំណាក់កាលទី ៣",
    timeframeEn: "Core System Build (10% & 5% Modules)",
    timeframeKm: "ការអភិវឌ្ឍម៉ូឌុល 10% និងមុខងារ Offline 5%",
    status: "upcoming",
    titleEn: "Offline Auto-Save & Administrative Modules",
    titleKm: "មុខងារ Offline Auto-Save និងម៉ូឌុលរដ្ឋបាល",
    bulletsEn: [
      "GDP: Develop Offline Auto-Save functionality (currently 5%) for field inspections",
      "GDGA: Build Maintenance (10%), Supply (10%), State Assets (10%) & Planning/Budget (10%)",
      "GDGA: Conduct further Payroll Processing (1.2.2) study with the Ministry",
    ],
    bulletsKm: [
      "ប្រេងកាត៖ អភិវឌ្ឍមុខងារ Offline Save ទិន្នន័យ Auto ករណីដាច់ Internet (5%)",
      "កិច្ចការទូទៅ៖ អភិវឌ្ឍការងារថែទាំ (10%) ផ្គត់ផ្គង់ (10%) ទ្រព្យសម្បត្តិរដ្ឋ (10%) និងផែនការថវិកា (10%)",
      "កិច្ចការទូទៅ៖ សិក្សាបន្ថែមជាមួយក្រសួងលើដំណើរការប្រាក់បៀវត្ស (1.2.2)",
    ],
  },
  {
    phase: "Phase 4",
    phaseKm: "ដំណាក់កាលទី ៤",
    timeframeEn: "Full Deployment & Handover",
    timeframeKm: "ការដាក់ឱ្យដំណើរការពេញលេញទាំង ៣ អគ្គនាយកដ្ឋាន",
    status: "upcoming",
    titleEn: "Full MME Digital Commissioning",
    titleKm: "ការដាក់ឱ្យប្រើប្រាស់ផ្លូវការនៅគ្រប់អគ្គនាយកដ្ឋានទាំង ៣",
    bulletsEn: [
      "Official launch of all GDGA, GDMR, and GDP digital public & internal portals",
      "End-to-end training for Ministry and Provincial Department officers",
      "Ongoing technical support, SLA monitoring, and system handover",
    ],
    bulletsKm: [
      "ដាក់ឱ្យដំណើរការផ្លូវការនូវគ្រប់ប្រព័ន្ធនៃអគ្គនាយកដ្ឋានទាំង ៣",
      "បណ្តុះបណ្តាលមន្ត្រីជំនាញថ្នាក់ក្រសួង និងមន្ទីររ៉ែនិងថាមពលខេត្ត",
      "ការគាំទ្របច្ចេកទេស និងការប្រគល់-ទទួលប្រព័ន្ធពេញលេញ",
    ],
  },
];
