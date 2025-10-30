import '@testing-library/jest-dom';

// Mock para next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
  useParams() {
    return {};
  },
}));

// Mock para Server Actions (se necessário)
jest.mock('@/app/page', () => ({
  __esModule: true,
  default: jest.fn(),
  carregarTarefas: jest.fn(),
}));