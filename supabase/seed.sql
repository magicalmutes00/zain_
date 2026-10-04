  -- Seed CMS content from the current static site data.
  -- Run ONCE after schema.sql (it clears + re-inserts the seed tables).
  -- services / site_content use upserts, so re-running stays safe for them.

  begin;

  -- ---------- services ----------
  insert into public.services (slug, title, description, icon, features, display_order) values
  ('fire-detection', 'Fire Detection Systems', 'Fire alarm installation in Oman for offices, plants, hospitals, hotels, and villas. Addressable and conventional systems with testing, commissioning, and annual maintenance contracts.', 'Flame', '["Addressable Fire Alarm Systems", "Conventional Fire Alarm Systems", "Emergency Lighting Systems", "Smoke & Heat Detectors", "Annual Maintenance Contracts"]', 1),
  ('fire-protection', 'Fire Protection Systems', 'Fire fighting contractors in Muscat and across Oman for hydrants, sprinklers, fire pumps, FM-200 suppression, hose reels, and extinguishers — installed to NFPA and Civil Defense standards.', 'Shield', '["Fire Hydrant Systems", "Fire Sprinkler Systems", "Fire Pump Systems", "FM-200 Suppression Systems", "Fire Extinguishers"]', 2),
  ('electrical', 'Electrical Services', 'Full range of commercial, industrial, and residential electrical installation and maintenance services.', 'Zap', '["Commercial Installations", "Industrial Installations", "Power Distribution", "Office Fit-outs", "Emergency Repairs"]', 3),
  ('cctv', 'CCTV & ELV Systems', 'Professional CCTV installation, access control, networking, and integrated security solutions.', 'Video', '["CCTV Installation", "Access Control", "Structured Cabling", "Fiber Optic Cabling", "IT Infrastructure"]', 4),
  ('plumbing', 'Plumbing Services', 'Comprehensive residential, commercial, and industrial plumbing services with 24/7 emergency support.', 'Droplets', '["Bathroom & Kitchen Plumbing", "Leak Detection", "Water Heater Services", "Drain Cleaning", "24/7 Emergency Support"]', 5),
  ('lpg-systems', 'LPG Systems', 'Design, supply, installation, testing, and maintenance of LPG systems with leak detection and statutory compliance across Oman.', 'Gas', '["LPG System Design", "Supply & Installation", "Leak Detection Systems", "Testing & Commissioning", "Preventive Maintenance"]', 6)
  on conflict (slug) do update set
    title = excluded.title, description = excluded.description, icon = excluded.icon,
    features = excluded.features, display_order = excluded.display_order,
    updated_at = now();

  -- ---------- projects ----------
  delete from public.projects;
  insert into public.projects (title, category, location, year, client, scope, status, image_url, display_order) values
  ('Al Madina Complex Fire Protection', 'Fire Protection', 'Muscat, Oman', '2024', 'Al Madina Group', 'Complete fire protection system design, supply & installation', 'completed', '/images/Diesel Fire Pump Installation with Fire Protection Piping and Control Panel.webp', 1),
  ('Royal Hospital Fire Detection Upgrade', 'Fire Detection', 'Salalah, Oman', '2024', 'Ministry of Health', 'Addressable fire alarm system & emergency lighting', 'completed', '/images/Modern Institutional Building Under Construction.webp', 2),
  ('Sohar Industrial Zone Electrical', 'Electrical', 'Sohar, Oman', '2023', 'Sohar Industrial Estate', 'Power distribution & electrical infrastructure', 'completed', '/images/Industrial Fire Pump Room Installation.webp', 3),
  ('Al Mouj Villa CCTV Installation', 'CCTV', 'Muscat, Oman', '2024', 'Private Client', 'HD CCTV system with remote monitoring', 'completed', '/images/Completed Mid-Rise Commercial and Residential Building Exterior.webp', 4),
  ('Grand Hotel Fire Safety System', 'Fire Protection', 'Muscat, Oman', '2023', 'Grand Hotel Group', 'Sprinkler system, hydrants & fire pumps', 'completed', '/images/HALA HOTEL SUITES – Modern Hotel Building Exterior.webp', 5),
  ('Duqm Warehouse Fire Protection', 'Fire Protection', 'Duqm, Oman', '2024', 'Duqm Logistics', 'Warehouse sprinkler & suppression systems', 'completed', '/images/Modern Industrial Warehouse and Factory Building Exterior.webp', 6),
  ('Nizwa Fort Fire Detection System', 'Fire Detection', 'Nizwa, Oman', '2025', 'Ministry of Heritage & Tourism', 'Heritage building addressable fire detection & alarm system', 'ongoing', '/images/Multi-Story Building with Exterior Scaffolding During Facade Finishing.webp', 7),
  ('Ibri Industrial City Electrical Infrastructure', 'Electrical', 'Ibri, Oman', '2025', 'Ibri Industrial Estate', 'High voltage power distribution & substation installation', 'ongoing', '/images/industrial-fire-pump-room-oman.webp', 8),
  ('Sur Corniche CCTV Surveillance Project', 'CCTV', 'Sur, Oman', '2025', 'Sur Municipality', 'Public area CCTV surveillance & monitoring system', 'ongoing', '/images/Modern Commercial Building Exterior with Glass Facade.webp', 9);

  -- ---------- certifications (gallery) ----------
  delete from public.certifications;
  insert into public.certifications (title, description, image_url, orientation, display_order) values
  ('Extinguishers License', 'Official license for fire extinguisher supply and maintenance.', '/images/fire-extinguisher-license-oman.webp', 'portrait', 1),
  ('Installation of FFFA', 'Certified fire alarm installation works.', '/images/fire-alarm-installation-oman.webp', 'portrait', 2),
  ('LPG System Certification', 'LPG system certification and approval.', '/images/lpg-system-certification-oman.webp', 'landscape', 3);

  -- ---------- products ----------
  delete from public.products;
  insert into public.products (name, category, display_order) values
  ('Fire Alarm Panels', 'Fire Detection', 1),
  ('Smoke Detectors', 'Fire Detection', 2),
  ('Heat Detectors', 'Fire Detection', 3),
  ('Fire Detection Equipment', 'Fire Detection', 4),
  ('Emergency Lights', 'Fire Detection', 5),
  ('Fire Pump Controllers', 'Fire Protection', 6),
  ('FM-200 Systems', 'Fire Protection', 7),
  ('Fire Pumps', 'Fire Protection', 8),
  ('Fire Hydrant Equipment', 'Fire Protection', 9),
  ('Fire Cabinets', 'Fire Protection', 10),
  ('Fire Hose Reels', 'Fire Protection', 11),
  ('Fire Extinguishers', 'Fire Protection', 12),
  ('Suppression Systems', 'Fire Protection', 13);

  -- ---------- faqs ----------
  delete from public.faqs;
  insert into public.faqs (question, answer, display_order) values
  ('What fire safety services do you provide?', 'We provide fire detection systems, fire protection systems including sprinklers, hydrants, pumps and FM-200 suppression, fire extinguishers, emergency lighting, electrical, CCTV, plumbing, and annual maintenance contracts across Oman.', 1),
  ('How much does fire alarm installation cost in Muscat?', 'Cost depends on building size, number of zones, panel type (addressable vs conventional), and cabling. A free site survey gives you a fixed quote. Call +968 92144367 or request a quote online.', 2),
  ('Are you a Civil Defense approved fire fighting company in Oman?', 'We design, install, test, and commission fire alarm and firefighting systems to Oman Civil Defense requirements and NFPA standards. Share your building type and location and we will advise on the exact approval path.', 3),
  ('Addressable vs conventional fire alarm — which do I need?', 'Addressable systems pinpoint the exact detector in alarm and suit large or multi-zone buildings such as hospitals, hotels, and plants. Conventional systems divide premises into zones and suit smaller buildings. We design, install, and maintain both.', 4),
  ('Do you provide annual maintenance contracts (AMC) for fire systems?', 'Yes. Our AMC covers scheduled inspection, testing, preventive maintenance, fault response, and documentation for fire detection, suppression, pumps, emergency lighting, electrical, and CCTV systems — with 24/7 emergency support.', 5),
  ('How often should fire extinguishers be serviced in Oman?', 'Most workplaces need professional servicing at least annually with monthly visual checks; high-risk sites need shorter intervals. Confirm the schedule against Oman Civil Defense requirements for your building type, then book servicing with a certified contractor.', 6),
  ('What areas in Oman do you serve?', 'We serve clients throughout Oman including Muscat, Barka, Sohar, Salalah, Nizwa, Duqm, Sur, Ibri, and all major cities.', 7),
  ('Do you handle CCTV, electrical, and plumbing too?', 'Yes. Alongside fire safety we install HD CCTV with NVR and access control, deliver commercial and industrial electrical works, and provide plumbing services with 24/7 emergency support.', 8);

  -- ---------- site_content ----------
  insert into public.site_content (key, value) values
  ('hero', '{"badge": "شريك موثوق في السلامة من الحرائق في عمان", "title_a": "Fire Protection Company in Oman —", "title_b": "Detection, Suppression & Engineering", "subtitle": "ZAIN Technical designs, supplies, installs, tests, commissions, and maintains fire detection, suppression, electrical, CCTV, and plumbing systems for commercial, industrial, government, and residential projects across Oman — with 24/7 emergency support.", "image": "/images/Outdoor%20Diesel%20Fire%20Pump%20Station%20Maintenance%20with%20Fire%20Water%20Storage%20Tank.webp", "stats": [{"value": "5+", "label": "Years"}, {"value": "200+", "label": "Projects"}, {"value": "100+", "label": "Clients"}]}'),
  ('brands', '["Tyco", "Honeywell", "Gent", "NAFFCO", "Dahua", "AL Aman", "Elite", "Bonfire"]')
  on conflict (key) do update set value = excluded.value, updated_at = now();

  commit;
