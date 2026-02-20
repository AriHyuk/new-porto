-- Migration: Seed Dummy Projects
-- Description: Seeding rich dummy data to showcase new storytelling and category features.

DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Try to get the first available user ID
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    IF v_user_id IS NOT NULL THEN
        -- Insert Project 1: Back-End focus
        INSERT INTO public.projects (
            title, slug, description, summary, challenge, contribution, key_features, category, tech_stack, image_url, user_id
        ) VALUES (
            'SkyScale API Gateway',
            'skyscale-api-gateway-' || floor(random()*1000),
            'A high-performance API Gateway designed for microservices architecture.',
            'Gatekeeper utama untuk ekosistem microservices yang menangani jutaan request per detik dengan latency di bawah 10ms.',
            'Tantangan terbesarnya adalah mengoptimalkan alokasi memori saat traffic spike mendadak dan memastikan sinkronisasi cache global tetap efisien.',
            'Saya merancang arsitektur middle-ware kustom untuk otentikasi JWT dan mengimplementasikan rate limiting dinamis berbasis Redis.',
            ARRAY['Dynamic Rate Limiting', 'Global Cache Sync', 'Custom JWT Middleware', 'Prometheus Instrumentation'],
            'Back-End',
            ARRAY['Go', 'Redis', 'PostgreSQL', 'Prometheus', 'Docker'],
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&auto=format&fit=crop',
            v_user_id
        );

        -- Insert Project 2: Cloud focus
        INSERT INTO public.projects (
            title, slug, description, summary, challenge, contribution, key_features, category, tech_stack, image_url, user_id
        ) VALUES (
            'AutoOps K8s Cluster',
            'autoops-k8s-cluster-' || floor(random()*1000),
            'Enterprise-grade Kubernetes cluster with automated CI/CD and monitoring.',
            'Pembangunan infrastruktur cloud yang scalable dan fully automated menggunakan prinsip Infrastructure as Code (IaC).',
            'Mengatur auto-scaling node grup di multi-region tanpa menyebabkan downtime saat melakukan update versi Kubernetes (Blue-Green Deployment).',
            'Saya membangun Terraform scripts untuk provisioning resource dan mengintegrasikan ArgoCD untuk GitOps workflow.',
            ARRAY['GitOps Workflow', 'Multi-Region High Availability', 'Automated Blue-Green Updates', 'Cost Optimization Dashboard'],
            'Cloud Infrastructure',
            ARRAY['Kubernetes', 'Terraform', 'ArgoCD', 'AWS', 'Grafana', 'Helm'],
            'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop',
            v_user_id
        );

        -- Insert Project 3: Full-Stack focus
        INSERT INTO public.projects (
            title, slug, description, summary, challenge, contribution, key_features, category, tech_stack, image_url, user_id
        ) VALUES (
            'Nexus Dashboard',
            'nexus-dashboard-' || floor(random()*1000),
            'An AI-powered dashboard for real-time data visualization and team collaboration.',
            'Platform kolaboratif yang menggabungkan analitik data real-time dengan asisten AI terintegrasi untuk tim engineering.',
            'Membangun sistem real-time sync untuk ribuan widget dashboard tanpa membebani thread client-side (Frontend Optimization).',
            'Saya memimpin pengembangan modul visualisasi data menggunakan D3.js dan mengintegrasikan OpenAI API untuk fitur reporting otomatis.',
            ARRAY['Real-time Data Sync', 'AI Reporting Assistant', 'Interactive D3.js Visuals', 'Role-based Access Control'],
            'Full-Stack',
            ARRAY['Next.js', 'TypeScript', 'Tailwind', 'OpenAI', 'Supabase', 'D3.js'],
            'https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&auto=format&fit=crop',
            v_user_id
        );
    END IF;
END $$;
