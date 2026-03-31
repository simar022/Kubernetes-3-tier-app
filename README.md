# ⚡ FlashStore: High-Performance Q-Commerce System

FlashStore is a cloud-native, ultra-fast Quick-Commerce (Q-Commerce) platform built to demonstrate high-availability and horizontal scalability. Designed to handle massive traffic spikes during "Flash Sales," the system uses Kubernetes HPA to dynamically manage server load.

---

## 🚀 Tech Stack

* Frontend	= React.js & Tailwind CSS	(Responsive UI & Real-time order tracking)

* Backend	= Node.js & Express	(RESTful API & Stress-test compute logic)

* Database	= PostgreSQL (Persistent storage for products and orders)

* DevOps	= Kubernetes (Orchestration, HPA, and Self-healing)

* Container	= Docker (Environment consistency and portability)

---

## 🛠️ System Architecture & Roles

The system is architected into specialized micro-services to ensure fault tolerance:

1. **Client Tier (Frontend)**

    * **Role**: Provides a seamless shopping experience.

    * **Features**: Product filtering, OTP-based checkout simulation, and order history visualization.

2. **API Tier (Backend)**

    * **Role**: Acts as the brain of the operation.

    * **Features**: Handles database queries, processes orders, and includes a /api/stress endpoint specifically designed to trigger CPU load for HPA demonstrations.

3. **Data Tier (PostgreSQL)**

    * **Role**: High-integrity data storage.

    * **Features**: Stores product catalogs and a history of successfully placed orders.

4. **Orchestration Tier (Kubernetes)**

    * **Role**: Infrastructure management.

    * **Components**: HPA automatically scales pods from 1 to 10 based on CPU usage.

    * **Services**: Load balances traffic across available pod replicas.

---

## ⚙️ Setup & Installation

📋 **Prerequisites**

* Docker

* Minikube

* kubectl CLI

📦 1. **Clone the Repository**

git clone https://github.com/your-username/flashstore.git
cd flashstore

🚢 2. **Deploy to Kubernetes**

Apply the manifests in order to ensure dependencies (like the database) are ready first:

minikube start
minikube addons enable metrics-server

kubectl apply -f k8s/db-deployment.yaml

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

kubectl apply -f k8s/backend-hpa.yaml

🌐 3. **Access the App**

If using Minikube, run the tunnel to access the LoadBalancer:

*minikube tunnel*

Open your browser at http://localhost (or your mapped Ingress host).

---

## 🧪 Stress Testing & Autoscaling

To witness the power of the Horizontal Pod Autoscaler (HPA), you can simulate a flash sale traffic spike:

1. Start Monitoring:

*kubectl get hpa backend-hpa -w*

2. Trigger Load:
Run the included stress script or a manual loop:

*while true; do curl -s "http://flashstore.local/api/stress?duration=1000"; done*

3. Observation:

Watch as the REPLICAS count jumps from 1 to 8 as the CPU utilization crosses the 50% threshold. 📈

