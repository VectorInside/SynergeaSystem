/**
 * Panel SynerGea - Single Page Application (SPA) Controller
 * Lógica de enrutamiento, controladores de vista, modales e interacciones
 */

let appData = getStoreData();
let currentView = 'dashboard';
let activeStatTab = 'tpn';
let activeRecTab = 'dadas';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderView('dashboard');
});

// Inicializar Navegación Lateral y Submenús
function initNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item[data-view]');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const viewName = item.getAttribute('data-view');
            if (viewName) {
                document.querySelectorAll('.sidebar-menu .menu-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                
                // Si está dentro de un submenú, marcar padre como activo
                const parentSubmenu = item.closest('.has-submenu');
                if (parentSubmenu) {
                    parentSubmenu.classList.add('active');
                }
                
                renderView(viewName);
            }
        });
    });
}

function toggleSubmenu(submenuId, chevronId) {
    const submenu = document.getElementById(submenuId);
    const chevron = document.getElementById(chevronId);
    if (submenu) {
        submenu.classList.toggle('open');
        chevron.classList.toggle('rotated');
    }
}

// Router Principal
function renderView(viewName) {
    currentView = viewName;
    const container = document.getElementById('app-content');
    if (!container) return;

    switch (viewName) {
        case 'dashboard':
            container.innerHTML = renderDashboardView();
            break;
        case 'mi-cuenta':
            container.innerHTML = renderMiCuentaView();
            break;
        case 'estadisticas':
            container.innerHTML = renderEstadisticasView();
            break;
        case 'tpn':
            container.innerHTML = renderTPNView();
            break;
        case 'recomendaciones':
            container.innerHTML = renderRecomendacionesView();
            break;
        case 'mis-cursos':
            container.innerHTML = renderMisCursosView();
            break;
        case 'catalogo-cursos':
            container.innerHTML = renderCatalogoCursosView();
            break;
        case 'unidades-educacion':
            container.innerHTML = renderUnidadesEducacionView();
            break;
        case 'gracias':
            container.innerHTML = renderGraciasView();
            break;
        case 'mi-capitulo':
            container.innerHTML = renderMiCapituloView();
            break;
        case 'comunidad-global':
            container.innerHTML = renderComunidadGlobalView();
            break;
        case 'contactos-destacados':
            container.innerHTML = renderContactosDestacadosView();
            break;
        default:
            container.innerHTML = renderDashboardView();
    }
}

// ==========================================================================
// VISTA: DASHBOARD
// ==========================================================================
function renderDashboardView() {
    const user = appData.currentUser;
    const stats = appData.stats;
    const edu = appData.desgloseEducacion;
    
    let pubsHtml = appData.publicidades.map(pub => `
        <div class="pub-card">
            <div style="position: relative;">
                <img src="${pub.imagen}" class="card-img-top" alt="${pub.titulo}">
                <span class="badge ${pub.tipo === 'Video' ? 'badge-danger' : 'badge-pill-light'}" style="position: absolute; bottom: 10px; right: 10px;">
                    ${pub.tipo}
                </span>
            </div>
            <div class="card-body-content">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <img src="${pub.avatar}" class="user-avatar-md" style="width: 42px; height: 42px;" alt="${pub.autor}">
                    <div>
                        <h4 style="margin: 0; font-size: 1rem; font-weight: 700;">${pub.autor}</h4>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${pub.categoria || 'Miembro del grupo'}</span>
                    </div>
                </div>
                <p style="font-size: 0.875rem; color: #475569; flex: 1;">${pub.descripcion}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button class="btn btn-success btn-sm" onclick="alert('Viendo perfil de ${pub.autor}')">
                        <i class="ti ti-eye"></i> VER PERFIL
                    </button>
                    ${pub.tipo === 'Video' ? `
                        <button class="btn btn-primary btn-sm" onclick="alert('Reproduciendo video comercial...')">
                            <i class="ti ti-player-play"></i> VER VIDEO
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');

    let actividadHtml = appData.actividadReciente.map(act => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="kpi-icon-wrapper blue" style="width: 42px; height: 42px; font-size: 1.2rem;">
                    <i class="${act.tipo.includes('Gracias') ? 'ti ti-gift' : 'ti ti-user-check'}"></i>
                </div>
                <div>
                    <strong style="font-size: 0.95rem;">${act.tipo}</strong> <span style="color: var(--text-muted); font-size: 0.875rem;">de ${act.autor}</span>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                        ${act.valor ? `$${act.valor.toLocaleString()} - ` : ''}${act.cliente ? `Cliente: ${act.cliente} - ` : ''}
                        <span class="badge ${getBadgeClass(act.estado)}">${act.estado}</span>
                    </div>
                </div>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">
                ${act.fecha}
            </div>
        </div>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title">Hola, ${user.nombre}</h1>
                <p class="page-subtitle">jueves, 1 de octubre de 2026 &nbsp;|&nbsp; <strong>Vigencia de la membresía:</strong> hasta ${user.expiracion}</p>
            </div>
            <div style="display: flex; gap: 0.75rem;">
                <button class="btn btn-success" onclick="openModal('modal-gracias')"><i class="ti ti-heart me-1"></i> VER GRACIAS</button>
                <button class="btn btn-primary" onclick="renderView('mis-cursos')"><i class="ti ti-book me-1"></i> VER EDUCACIÓN</button>
            </div>
        </div>

        <!-- Metric Grid -->
        <div class="kpi-grid">
            <div class="kpi-card highlight">
                <div class="kpi-icon-wrapper" style="background: rgba(255,255,255,0.2); color: white;">
                    <i class="ti ti-gift"></i>
                </div>
                <div class="kpi-content">
                    <div class="kpi-value">$${stats.valorRecibido.toLocaleString('es-MX', {minimumFractionDigits: 2})}</div>
                    <div class="kpi-title">Valor Recibido</div>
                    <div class="kpi-subtext">${stats.valorRecibidoValidados} validados</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon-wrapper green"><i class="ti ti-heart"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">$${stats.valorDado.toFixed(2)}</div>
                    <div class="kpi-title">Valor Dado</div>
                    <div class="kpi-subtext">${stats.valorDadoValidados} validados</div>
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-icon-wrapper yellow"><i class="ti ti-users"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.recomendacionesTotal}</div>
                    <div class="kpi-title">Recomendaciones</div>
                    <div class="kpi-subtext">${stats.recomendacionesConcretadas} recomendación concretada</div>
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-icon-wrapper purple"><i class="ti ti-bookmarks"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.unidadesEducacionTotal}</div>
                    <div class="kpi-title">Unidades de Educación</div>
                    <div class="kpi-subtext">${stats.unidadesEducacionRegistros} registros</div>
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-icon-wrapper green"><i class="ti ti-heart"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.graciasDados}</div>
                    <div class="kpi-title">Gracias Dados</div>
                    <div class="kpi-subtext">${stats.graciasDadosValidados} validados</div>
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-icon-wrapper blue"><i class="ti ti-gift"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.graciasRecibidos}</div>
                    <div class="kpi-title">Gracias Recibidos</div>
                    <div class="kpi-subtext">${stats.graciasRecibidosValidados} validados</div>
                </div>
            </div>
        </div>

        <!-- Desglose Educación -->
        <div class="card mb-4">
            <h3 class="card-title">Desglose de Educación</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i class="ti ti-microphone" style="font-size: 1.5rem; color: #8b5cf6;"></i>
                    <div><strong>${edu.podcasts}</strong> <span style="color: var(--text-muted); font-size: 0.9rem;">Podcasts/Webinars</span></div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i class="ti ti-users" style="font-size: 1.5rem; color: #10b981;"></i>
                    <div><strong>${edu.presenciales}</strong> <span style="color: var(--text-muted); font-size: 0.9rem;">Formaciones Presenciales</span></div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i class="ti ti-device-laptop" style="font-size: 1.5rem; color: #3b82f6;"></i>
                    <div><strong>${edu.cursosOnline}</strong> <span style="color: var(--text-muted); font-size: 0.9rem;">Cursos Online</span></div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i class="ti ti-book" style="font-size: 1.5rem; color: #f59e0b;"></i>
                    <div><strong>${edu.librosLeidos}</strong> <span style="color: var(--text-muted); font-size: 0.9rem;">Libros Leídos</span></div>
                </div>
            </div>
        </div>

        <!-- Publicidades del Grupo -->
        <div class="card mb-4">
            <h3 class="card-title">Publicidades del Grupo</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Material comercial compartido por los miembros de ${user.grupo}.</p>
            <div class="cards-grid">
                ${pubsHtml}
            </div>
        </div>

        <!-- Actividad Reciente -->
        <div class="card">
            <h3 class="card-title">Actividad Reciente</h3>
            <div>${actividadHtml}</div>
        </div>
    `;
}

// ==========================================================================
// VISTA: MI CUENTA
// ==========================================================================
function renderMiCuentaView() {
    const u = appData.currentUser;
    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-user"></i> Mi Cuenta</h1>
                <p class="page-subtitle">Gestiona tu información y membresía</p>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem;">
            <!-- Informacion Personal Card -->
            <div class="card text-center" style="display: flex; flex-direction: column; align-items: center;">
                <img src="${u.avatar}" class="user-avatar-md" style="width: 120px; height: 120px; margin-bottom: 1rem;" alt="${u.nombre}">
                <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.25rem;">${u.nombre}</h2>
                <span style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${u.email}</span>
                
                <div style="width: 100%; text-align: left; border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Email</span>
                        <div style="font-weight: 500;">${u.email}</div>
                    </div>
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Categoría / Industria</span>
                        <div style="font-weight: 500;">${u.categoria}</div>
                    </div>
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Miembro desde</span>
                        <div style="font-weight: 500;">${u.miembroDesde}</div>
                    </div>
                </div>

                <button class="btn btn-success w-100 mt-4" onclick="alert('Modo de edición de perfil activado')">
                    <i class="ti ti-edit"></i> EDITAR PERFIL
                </button>
            </div>

            <!-- Estado de Membresia & Pedidos -->
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="card">
                    <h3 class="card-title">Estado de Membresía</h3>
                    <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 1.25rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 1rem;">
                        <i class="ti ti-circle-check" style="font-size: 2rem; color: #0284c7;"></i>
                        <div>
                            <strong style="color: #0369a1; font-size: 1.1rem;">${u.estadoMembresia}</strong>
                            <div style="color: #0c4a6e; font-size: 0.9rem;">Tu membresía está activa hasta el <strong>${u.expiracion}</strong></div>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
                        <div>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">Fecha de Activación</span>
                            <div style="font-size: 1.1rem; font-weight: 600;">${u.activacion}</div>
                        </div>
                        <div>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">Fecha de Expiración</span>
                            <div style="font-size: 1.1rem; font-weight: 600;">${u.expiracion}</div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Pedidos Recientes</h3>
                    <div style="padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
                        <i class="ti ti-shopping-cart" style="font-size: 3rem; margin-bottom: 0.5rem; opacity: 0.4;"></i>
                        <p>No tienes pedidos recientes</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================================================
// VISTA: ESTADÍSTICAS DEL GRUPO
// ==========================================================================
function renderEstadisticasView() {
    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-chart-bar"></i> Estadísticas del Grupo</h1>
                <p class="page-subtitle">Grupos administrados</p>
            </div>
            <button class="btn btn-primary" onclick="exportCSV()"><i class="ti ti-download"></i> EXPORTAR CSV</button>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card highlight">
                <div class="kpi-icon-wrapper" style="background: rgba(255,255,255,0.2); color: white;"><i class="ti ti-gift"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">$0</div>
                    <div class="kpi-title">Valor Recibido</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon-wrapper green"><i class="ti ti-heart"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">$0</div>
                    <div class="kpi-title">Valor Dado</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon-wrapper blue"><i class="ti ti-users"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">0</div>
                    <div class="kpi-title">Recomendaciones</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon-wrapper yellow"><i class="ti ti-book"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">0</div>
                    <div class="kpi-title">Unidades Educación</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700;">Actividad del Grupo</h3>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 0.875rem; color: var(--text-muted);">Desde:</span>
                    <input type="date" class="form-control" value="2026-10-01" style="width: auto;">
                    <span style="font-size: 0.875rem; color: var(--text-muted);">Hasta:</span>
                    <input type="date" class="form-control" value="2026-10-01" style="width: auto;">
                    <button class="btn btn-success btn-sm"><i class="ti ti-filter"></i> FILTRAR</button>
                </div>
            </div>

            <div class="tabs-header">
                <button class="tab-btn ${activeStatTab === 'tpn' ? 'active' : ''}" onclick="switchStatTab('tpn')"><i class="ti ti-users"></i> TPN DEL GRUPO</button>
                <button class="tab-btn ${activeStatTab === 'rec' ? 'active' : ''}" onclick="switchStatTab('rec')"><i class="ti ti-star"></i> RECOMENDACIONES</button>
                <button class="tab-btn ${activeStatTab === 'edu' ? 'active' : ''}" onclick="switchStatTab('edu')"><i class="ti ti-book"></i> EDUCACIÓN</button>
                <button class="tab-btn ${activeStatTab === 'gra' ? 'active' : ''}" onclick="switchStatTab('gra')"><i class="ti ti-heart"></i> GRACIAS</button>
            </div>

            <div style="padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
                <i class="ti ti-users" style="font-size: 3rem; margin-bottom: 0.5rem; opacity: 0.3;"></i>
                <p>No hay datos en este período</p>
            </div>
        </div>
    `;
}

function switchStatTab(tab) {
    activeStatTab = tab;
    renderView('estadisticas');
}

// ==========================================================================
// VISTA: TPN (TE PRESENTO MI NEGOCIO)
// ==========================================================================
function renderTPNView() {
    let tpnRows = appData.tpnList.map(tpn => `
        <tr>
            <td>${tpn.fecha}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 36px; height: 36px; border-radius: 6px; background: #0052CC; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${tpn.reunionCon.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <strong style="display: block;">${tpn.reunionCon}</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${tpn.email}</span>
                    </div>
                </div>
            </td>
            <td>${tpn.iniciadoPor}</td>
            <td><span class="badge badge-info">${tpn.ubicacion}</span></td>
            <td>${tpn.notas}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteTPN(${tpn.id})">
                    <i class="ti ti-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title">TPN - Te presento mi negocio</h1>
                <p class="page-subtitle">Gestiona tus reuniones TPN</p>
            </div>
            <button class="btn btn-success" onclick="openModal('modal-tpn')"><i class="ti ti-plus"></i> REGISTRAR TPN</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
            <div class="card" style="margin-bottom: 0;">
                <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">TOTAL TPN</span>
                <div style="font-size: 2.2rem; font-weight: 800; margin-top: 0.25rem;">${appData.tpnList.length}</div>
            </div>
            <div class="card" style="margin-bottom: 0;">
                <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">ESTE MES</span>
                <div style="font-size: 2.2rem; font-weight: 800; margin-top: 0.25rem;">0</div>
            </div>
            <div class="card" style="margin-bottom: 0;">
                <div style="display: flex; gap: 0.75rem; align-items: flex-end;">
                    <div class="form-group" style="flex: 1;">
                        <label class="form-label">Fecha Inicio</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <label class="form-label">Fecha Final</label>
                        <input type="date" class="form-control">
                    </div>
                    <button class="btn btn-success btn-sm" style="height: 38px;"><i class="ti ti-filter"></i></button>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="card-title">Historial de TPN</h3>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>REUNIÓN CON</th>
                            <th>INICIADO POR</th>
                            <th>UBICACIÓN</th>
                            <th>TEMAS / NOTAS</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tpnRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ==========================================================================
// VISTA: RECOMENDACIONES
// ==========================================================================
function renderRecomendacionesView() {
    let dadasRows = appData.recomendacionesDadas.map(r => `
        <tr>
            <td>${r.fecha}</td>
            <td>${r.para}</td>
            <td><strong>${r.cliente}</strong></td>
            <td>${r.telefono}</td>
            <td><span class="temp-dot ${r.temp.toLowerCase()}"></span></td>
            <td><span class="badge ${getBadgeClass(r.estado)}">${r.estado}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteRecomendacion(${r.id}, 'dada')">ELIMINAR</button></td>
        </tr>
    `).join('');

    let recibidasRows = appData.recomendacionesRecibidas.map(r => `
        <tr>
            <td>${r.fecha}</td>
            <td>${r.de}</td>
            <td><strong>${r.cliente}</strong></td>
            <td>${r.telefono}</td>
            <td><span class="temp-dot ${r.temp.toLowerCase()}"></span></td>
            <td>
                <select class="form-control" style="padding: 0.25rem 0.5rem; font-size: 0.85rem;" onchange="updateEstadoRecibida(${r.id}, this.value)">
                    <option value="Contactado" ${r.estado === 'Contactado' ? 'selected' : ''}>Contactado</option>
                    <option value="Pendiente" ${r.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                </select>
            </td>
        </tr>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-star"></i> Recomendaciones</h1>
                <p class="page-subtitle">Gestiona tus referencias y negocios compartidos</p>
            </div>
            <button class="btn btn-success" onclick="openModal('modal-recomendacion')"><i class="ti ti-plus"></i> Nueva Recomendación</button>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-content">
                    <span class="kpi-title">RECOMENDACIONES DADAS</span>
                    <div class="kpi-value">${appData.recomendacionesDadas.length}</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-content">
                    <span class="kpi-title">RECOMENDACIONES RECIBIDAS</span>
                    <div class="kpi-value">${appData.recomendacionesRecibidas.length}</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-content">
                    <span class="kpi-title">RECOMENDACIONES GANADAS</span>
                    <div class="kpi-value">0</div>
                </div>
            </div>
            <div class="kpi-card highlight">
                <div class="kpi-content">
                    <span class="kpi-title" style="color: rgba(255,255,255,0.8);">NEGOCIO GENERADO</span>
                    <div class="kpi-value">$0</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="tabs-header">
                <button class="tab-btn ${activeRecTab === 'dadas' ? 'active' : ''}" onclick="switchRecTab('dadas')">
                    Recomendaciones Dadas <span class="badge badge-info">${appData.recomendacionesDadas.length}</span>
                </button>
                <button class="tab-btn ${activeRecTab === 'recibidas' ? 'active' : ''}" onclick="switchRecTab('recibidas')">
                    Recomendaciones Recibidas <span class="badge badge-info">${appData.recomendacionesRecibidas.length}</span>
                </button>
            </div>

            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>${activeRecTab === 'dadas' ? 'PARA' : 'DE'}</th>
                            <th>CLIENTE</th>
                            <th>TELÉFONO</th>
                            <th>TEMP.</th>
                            <th>ESTADO</th>
                            ${activeRecTab === 'dadas' ? '<th>ACCIONES</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${activeRecTab === 'dadas' ? dadasRows : recibidasRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function switchRecTab(tab) {
    activeRecTab = tab;
    renderView('recomendaciones');
}

// ==========================================================================
// VISTAS DE EDUCACIÓN
// ==========================================================================
function renderMisCursosView() {
    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-school"></i> Mis Cursos</h1>
                <p class="page-subtitle">Cursos en los que estás inscrito y tu progreso</p>
            </div>
        </div>

        <div class="card">
            <h3 class="card-title">Mis Cursos Activos <span class="badge badge-info ms-2">0 cursos</span></h3>
            <div style="padding: 4rem 1rem; text-align: center;">
                <i class="ti ti-school" style="font-size: 4rem; color: var(--text-muted); opacity: 0.3; margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Aún no estás inscrito en ningún curso. Explora el catálogo para comenzar tu formación.</p>
                <button class="btn btn-success" onclick="renderView('catalogo-cursos')"><i class="ti ti-books"></i> VER CATÁLOGO DE CURSOS</button>
            </div>
        </div>
    `;
}

function renderCatalogoCursosView() {
    let coursesHtml = appData.cursosDisponibles.map(c => `
        <div class="course-card">
            <img src="${c.imagen}" class="card-img-top" alt="${c.titulo}">
            <div class="card-body-content">
                <span class="badge badge-info" style="align-self: flex-start; margin-bottom: 0.5rem;"><i class="ti ti-sparkles"></i> ${c.estado}</span>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">${c.titulo}</h3>
                <p style="font-size: 0.875rem; color: var(--text-muted); flex: 1;">${c.descripcion}</p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="ti ti-files"></i> ${c.lecciones} lecciones</span>
                    <button class="btn btn-primary btn-sm" onclick="alert('Inscribiéndose al curso...')"><i class="ti ti-eye"></i> VER DETALLES</button>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-books"></i> Catálogo de Cursos</h1>
                <p class="page-subtitle">Descubre y comienza nuevos cursos de formación</p>
            </div>
        </div>

        <div class="cards-grid">
            ${coursesHtml}
        </div>
    `;
}

function renderUnidadesEducacionView() {
    let historyRows = appData.unidadesEducacionHistorial.map(h => `
        <tr>
            <td>${h.fecha}</td>
            <td>${h.podcasts || '-'}</td>
            <td>${h.presenciales || '-'}</td>
            <td>${h.online || '-'}</td>
            <td>${h.libros || '-'}</td>
            <td><strong>${h.total}</strong></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteEducacion(${h.id})"><i class="ti ti-trash"></i></button></td>
        </tr>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-clipboard-list"></i> Unidades de Educación</h1>
                <p class="page-subtitle">Registra y consulta tu historial de actividades educativas</p>
            </div>
            <button class="btn btn-success" onclick="openModal('modal-educacion')"><i class="ti ti-plus"></i> AGREGAR REGISTRO</button>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">Podcasts</span><div class="kpi-value">1</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">Presenciales</span><div class="kpi-value">0</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">Cursos Online</span><div class="kpi-value">1</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">Libros</span><div class="kpi-value">1</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">Registros</span><div class="kpi-value">2</div></div></div>
            <div class="kpi-card highlight"><div class="kpi-content"><span class="kpi-title" style="color:white;">Total Puntos</span><div class="kpi-value">3</div></div></div>
        </div>

        <div class="card">
            <h3 class="card-title">Historial de Registros</h3>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>PODCASTS</th>
                            <th>PRESENCIALES</th>
                            <th>ONLINE</th>
                            <th>LIBROS</th>
                            <th>TOTAL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${historyRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ==========================================================================
// VISTA: GRACIAS POR SUMAR A MI NEGOCIO
// ==========================================================================
function renderGraciasView() {
    let rows = appData.graciasList.map(g => `
        <tr>
            <td><strong>${g.persona}</strong></td>
            <td><span class="badge badge-pill-light">${g.tipo}</span></td>
            <td>${g.referencia}</td>
            <td><strong style="color: var(--primary);">$${g.valor.toFixed(2)}</strong></td>
            <td><span class="badge badge-success"><i class="ti ti-check"></i> ${g.estado}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteGracias(${g.id})"><i class="ti ti-x"></i></button></td>
        </tr>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-heart"></i> Gracias por Sumar a Mi Negocio</h1>
                <p class="page-subtitle">Registra los negocios que fueron concretados gracias a referencias de otros miembros</p>
            </div>
            <button class="btn btn-success" onclick="openModal('modal-gracias')"><i class="ti ti-plus"></i> REGISTRAR NUEVO</button>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">TOTAL REGISTRADO</span><div class="kpi-value">${appData.graciasList.length}</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">VALOR TOTAL</span><div class="kpi-value">$2,200.00</div></div></div>
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">GANANCIAS VALIDADAS</span><div class="kpi-value">$0.00</div></div></div>
            <div class="kpi-card highlight"><div class="kpi-content"><span class="kpi-title" style="color:white;">GRACIAS DADAS VALIDADAS</span><div class="kpi-value">$7,300.00</div></div></div>
        </div>

        <div class="card">
            <h3 class="card-title">Negocios Registrados</h3>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>PERSONA</th>
                            <th>TIPO</th>
                            <th>REFERENCIA</th>
                            <th>VALOR</th>
                            <th>ESTADO</th>
                            <th>ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ==========================================================================
// VISTAS DE COMUNIDAD SYNERGEA
// ==========================================================================
function renderMiCapituloView() {
    const c = appData.miCapitulo;
    let membersHtml = c.miembros.map(m => `
        <div class="member-card">
            <div class="card-body-content text-center">
                <img src="${m.avatar}" class="user-avatar-md" style="width: 80px; height: 80px; margin: 0 auto 1rem;" alt="${m.nombre}">
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.35rem;">${m.nombre}</h3>
                <span class="badge badge-info" style="margin-bottom: 1rem;">${m.categoria}</span>
                
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    <div><strong>Email:</strong> ${m.email}</div>
                    <div><strong>Capítulo:</strong> ${m.capitulo}</div>
                </div>

                <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                    <a href="mailto:${m.email}" class="btn btn-success btn-sm" style="flex: 1;"><i class="ti ti-mail"></i> EMAIL</a>
                    <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="alert('Viendo perfil completo de ${m.nombre}')">VER PERFIL</button>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-building"></i> ${c.nombre} <span class="badge badge-info" style="font-size: 0.9rem;">Mi Capítulo</span></h1>
            </div>
            <button class="btn btn-primary" onclick="renderView('comunidad-global')"><i class="ti ti-world"></i> VER COMUNIDAD GLOBAL</button>
        </div>

        <div class="card mb-4">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div><strong>Sede:</strong> <div style="color: var(--text-muted);">${c.sede}</div></div>
                <div><strong>Estado/Región:</strong> <div><span class="badge badge-warning">${c.estado}</span></div></div>
                <div><strong>País:</strong> <div><span class="badge badge-info">${c.pais}</span></div></div>
                <div><strong>Idioma:</strong> <div><span class="badge badge-success">${c.idioma}</span></div></div>
                <div><strong>Total de Miembros:</strong> <div style="font-size: 1.5rem; font-weight: 800;">${c.totalMiembros}</div></div>
            </div>
        </div>

        <div class="cards-grid">
            ${membersHtml}
        </div>
    `;
}

function renderComunidadGlobalView() {
    const cg = appData.comunidadGlobal;
    let capsHtml = cg.capitulos.map(cap => `
        <div class="card mb-3" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">${cap.nombre} ${cap.esMiCapitulo ? '<span class="badge badge-info">Mi Capítulo</span>' : ''}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${cap.miembros} miembros</p>
                
                <div style="font-size: 0.875rem; color: #475569; margin-bottom: 1rem;">
                    <div><i class="ti ti-map-pin me-1"></i> ${cap.ubicacion}</div>
                    <div class="mt-1"><span class="badge badge-info">${cap.idioma}</span></div>
                </div>
            </div>
            <button class="btn btn-success w-100 mt-2" onclick="renderView('mi-capitulo')">VER MIEMBROS</button>
        </div>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-world"></i> Comunidad Global</h1>
                <p class="page-subtitle">Explora todos los capítulos y miembros de la red SynerGea</p>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card"><div class="kpi-content"><span class="kpi-title">TOTAL DE CAPÍTULOS</span><div class="kpi-value">${cg.totalCapitulos}</div></div></div>
            <div class="kpi-card highlight"><div class="kpi-content"><span class="kpi-title" style="color:white;">TOTAL DE MIEMBROS</span><div class="kpi-value">${cg.totalMiembros}</div></div></div>
        </div>

        <div class="cards-grid">
            ${capsHtml}
        </div>
    `;
}

function renderContactosDestacadosView() {
    let contactsHtml = appData.contactosDestacados.map(cd => `
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${cd.avatar}" class="user-avatar-md" alt="${cd.nombre}">
                <div>
                    <h4 style="margin: 0; font-size: 1.1rem; font-weight: 700;">${cd.nombre}</h4>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">${cd.email}</span>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <a href="mailto:${cd.email}" class="btn btn-outline-primary btn-sm"><i class="ti ti-mail"></i></a>
                <button class="btn btn-success btn-sm" onclick="alert('Perfil de ${cd.nombre}')">VER PERFIL COMPLETO</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="page-title-section">
            <div>
                <h1 class="page-title"><i class="ti ti-heart"></i> Mis Contactos Destacados</h1>
            </div>
        </div>

        <div class="card mb-4">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Total de contactos destacados</span>
            <div style="font-size: 2.2rem; font-weight: 800;">${appData.contactosDestacados.length}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${contactsHtml}
        </div>
    `;
}

// ==========================================================================
// MODALES Y ACCIONES FORMULARIO
// ==========================================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
}

function saveTPN() {
    const fecha = document.getElementById('tpn-fecha').value;
    const nombre = document.getElementById('tpn-nombre').value;
    const email = document.getElementById('tpn-email').value;
    const iniciado = document.getElementById('tpn-iniciado').value;
    const ubicacion = document.getElementById('tpn-ubicacion').value;
    const notas = document.getElementById('tpn-notas').value;

    if (!fecha || !nombre || !email) {
        alert("Por favor completa los campos obligatorios.");
        return;
    }

    const newTPN = {
        id: Date.now(),
        fecha: fecha,
        reunionCon: nombre,
        email: email,
        iniciadoPor: iniciado,
        ubicacion: ubicacion,
        notas: notas
    };

    appData.tpnList.unshift(newTPN);
    saveStoreData(appData);
    closeModal('modal-tpn');
    renderView('tpn');
}

function deleteTPN(id) {
    if (confirm("¿Estás seguro de eliminar esta reunión TPN?")) {
        appData.tpnList = appData.tpnList.filter(item => item.id !== id);
        saveStoreData(appData);
        renderView('tpn');
    }
}

function saveRecomendacion() {
    const fecha = document.getElementById('rec-fecha').value;
    const para = document.getElementById('rec-para').value;
    const cliente = document.getElementById('rec-cliente').value;
    const telefono = document.getElementById('rec-telefono').value;
    const temp = document.getElementById('rec-temp').value;

    if (!fecha || !para || !cliente) {
        alert("Por favor completa los campos obligatorios.");
        return;
    }

    const newRec = {
        id: Date.now(),
        fecha: fecha,
        para: para,
        cliente: cliente,
        telefono: telefono,
        temp: temp,
        estado: "Pendiente"
    };

    appData.recomendacionesDadas.unshift(newRec);
    saveStoreData(appData);
    closeModal('modal-recomendacion');
    renderView('recomendaciones');
}

function deleteRecomendacion(id, tipo) {
    if (confirm("¿Estás seguro de eliminar esta recomendación?")) {
        if (tipo === 'dada') {
            appData.recomendacionesDadas = appData.recomendacionesDadas.filter(r => r.id !== id);
        } else {
            appData.recomendacionesRecibidas = appData.recomendacionesRecibidas.filter(r => r.id !== id);
        }
        saveStoreData(appData);
        renderView('recomendaciones');
    }
}

function updateEstadoRecibida(id, nuevoEstado) {
    const item = appData.recomendacionesRecibidas.find(r => r.id === id);
    if (item) {
        item.estado = nuevoEstado;
        saveStoreData(appData);
    }
}

function saveEducacion() {
    const fecha = document.getElementById('edu-fecha').value;
    const podcasts = parseInt(document.getElementById('edu-podcasts').value) || 0;
    const presenciales = parseInt(document.getElementById('edu-presenciales').value) || 0;
    const online = parseInt(document.getElementById('edu-online').value) || 0;
    const libros = parseInt(document.getElementById('edu-libros').value) || 0;

    if (!fecha) {
        alert("Por favor selecciona una fecha.");
        return;
    }

    const total = podcasts + presenciales + online + libros;

    const newEdu = {
        id: Date.now(),
        fecha: fecha,
        podcasts: podcasts,
        presenciales: presenciales,
        online: online,
        libros: libros,
        total: total
    };

    appData.unidadesEducacionHistorial.unshift(newEdu);
    appData.stats.unidadesEducacionTotal += total;
    saveStoreData(appData);
    closeModal('modal-educacion');
    renderView('unidades-educacion');
}

function deleteEducacion(id) {
    if (confirm("¿Deseas eliminar este registro educativo?")) {
        appData.unidadesEducacionHistorial = appData.unidadesEducacionHistorial.filter(h => h.id !== id);
        saveStoreData(appData);
        renderView('unidades-educacion');
    }
}

function saveGracias() {
    const persona = document.getElementById('gra-persona').value;
    const tipo = document.getElementById('gra-tipo').value;
    const referencia = document.getElementById('gra-referencia').value;
    const valor = parseFloat(document.getElementById('gra-valor').value) || 0;

    if (!persona || !valor) {
        alert("Por favor completa el nombre de la persona y el valor.");
        return;
    }

    const newGracias = {
        id: Date.now(),
        persona: persona,
        tipo: tipo,
        referencia: referencia,
        valor: valor,
        estado: "Validado"
    };

    appData.graciasList.unshift(newGracias);
    saveStoreData(appData);
    closeModal('modal-gracias');
    renderView('gracias');
}

function deleteGracias(id) {
    if (confirm("¿Eliminar este registro de gracias?")) {
        appData.graciasList = appData.graciasList.filter(g => g.id !== id);
        saveStoreData(appData);
        renderView('gracias');
    }
}

// Utilitarios
function getBadgeClass(estado) {
    switch (estado) {
        case 'Validado': return 'badge-success';
        case 'Contactado': return 'badge-info';
        case 'Pendiente': return 'badge-warning';
        default: return 'badge-pill-light';
    }
}

function exportCSV() {
    alert("Iniciando descarga de exportación de estadísticas en formato CSV...");
}

function logout() {
    if (confirm("¿Deseas cerrar sesión en el Panel SynerGea?")) {
        alert("Sesión cerrada correctamente.");
        window.location.reload();
    }
}
