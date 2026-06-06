# 🚀 Full-Stack Web Application Playground

Welcome to my personal cloud infrastructure and development playground! This project serves as an active, hands-on environment for mastering modern deployment pipelines, cloud architecture patterns, and backend secure programming practices.

## 📝 Project Overview
This repository contains a full-stack user registration application built to explore the integration of client-side forms, robust backend input validation, containerized deployment, and high-availability cloud routing. 

> ⚠️ **Note:** This is a **playground project built strictly for learning, experimentation, and testing purposes**. It is under continuous development as I evaluate new architectural patterns and infrastructure configurations.

---

## 🏗️ Architecture & Core Concepts Covered

This playground spans multiple areas of the engineering stack, with a specific focus on structural infrastructure and data safety:

* **Security & Input Sanitization:** Implements explicit multi-layered protection checks on user entry points:
    * **XSS Protection:** Enforces structural HTML escaping utilizing `express-validator` to neutralize malicious scripts prior to storage.
    * **NoSQL Injection Defense:** Employs query sanitization via `mongo-sanitize` to strip logical operator manipulation attempts (e.g., preventing parameter conversion attacks using `$` prefix filtering).
    * **Data Consistency:** Strict server-side type-casting, whitespace normalization, and automated structural validation for critical values (names, verified email patterns).
* **High-Availability Infrastructure:** Architected to run behind an **Application Load Balancer (ALB)** distributing traffic across decoupled compute nodes.
* **Data Persistence:** Integrated with a document-oriented **MongoDB** database, configured with schema-enforced validation rules.
* **Cost & Resource Efficiency:** Configured with active resource telemetry tracking (via customized monitoring watchdogs like CloudWatch alarms) designed to automatically hibernate compute infrastructure during idle, low-utilization windows (<0.5% CPU baseline) to preserve resources.

---

## 🛠️ Technology Stack
* **Frontend:** Vanilla JS, HTML5 (Semantic Forms, Form-level validation boundaries)
* **Backend:** Node.js, Express.js
* **Libraries:** `express-validator`, `mongo-sanitize`, `mongodb`
* **Database:** MongoDB
* **Cloud Infrastructure:** AWS (EC2, Application Load Balancer, VPC Networking, CloudWatch telemetry)

---

## 🚀 Getting Started

Follow these steps to configure, run, and interact with the project locally.

### Prerequisites
Ensure you have the following environments available locally:
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a remote MongoDB Atlas connection URI string.

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name